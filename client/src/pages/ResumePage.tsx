import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, Pencil, Play, Trash2 } from "lucide-react";

import CheckPanel from "../components/resumes/CheckPanel";
import DeleteVersionModal from "../components/resumes/DeleteVersionModal";
import EditNoteModal from "../components/resumes/EditNoteModal";
import Button from "../components/ui/Button";
import MobileActionBar from "../components/ui/MobileActionBar";
import { LoadingText } from "../components/ui/Spinner";
import { HeaderAction, usePageTitle } from "../context/PageHeaderContext";
import { useToast } from "../context/ToastContext";
import { api, errorMessage, isApiFailure } from "../lib/api";
import { versionTitle } from "../lib/resumes";
import type { Resume, ResumeCheck } from "../lib/types";

// One resume version: its note, its AI checks (newest first), its text (collapsed) and its actions.
export default function ResumePage() {
  const { id = "" } = useParams(); // the id in the address /resumes/:id
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [selectedCheckId, setSelectedCheckId] = useState<string | null>(null);

  const resume = useQuery({
    queryKey: ["resumes", id],
    queryFn: () => api.get<Resume>(`/resumes/${id}`),
  });

  const checks = useQuery({
    queryKey: ["resume-checks", id],
    queryFn: () => api.get<ResumeCheck[]>(`/resume-checks?resumeId=${id}`),
  });

  // asks the AI to check this version; the new check is shown when it arrives
  const runCheck = useMutation({
    mutationFn: () => api.post<ResumeCheck>("/resume-checks", { resumeId: id }),
    onSuccess: async (check) => {
      await queryClient.invalidateQueries({ queryKey: ["resume-checks", id] });
      setSelectedCheckId(check._id);
      showToast("Check complete");
    },
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  const makeCurrent = useMutation({
    mutationFn: () => api.patch(`/resumes/${id}/current`),
    // ["resumes"] also matches ["resumes", id], so the list and this page both reload
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
      showToast("This version is now the current one");
    },
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  const remove = useMutation({
    mutationFn: () => api.delete(`/resumes/${id}`),
    onSuccess: async () => {
      // forget this version first, so the page does not try to load it again after it is gone
      queryClient.removeQueries({ queryKey: ["resumes", id] });
      queryClient.removeQueries({ queryKey: ["resume-checks", id] });
      await queryClient.invalidateQueries({ queryKey: ["resumes"], exact: true });
      navigate("/resumes");
    },
  });

  usePageTitle(resume.data ? versionTitle(resume.data) : "Resume");

  if (resume.isPending) {
    return <LoadingText>Loading this version…</LoadingText>;
  }

  if (resume.isError) {
    const notFound = isApiFailure(resume.error) && resume.error.status === 404;
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-bad">
          {notFound ? "This resume version was not found." : "This resume version could not be loaded."}
        </p>
        <Link to="/resumes" className="text-sm text-accent hover:underline">
          Back to all versions
        </Link>
      </div>
    );
  }

  const version = resume.data;

  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-6">
      {/* the header button is for a desktop; a phone has the bar at the bottom */}
      <HeaderAction>
        <div className="hidden md:block">
          <Button size="sm" loading={runCheck.isPending} onClick={() => runCheck.mutate()}>
            {!runCheck.isPending && <Play size={14} aria-hidden="true" />}
            {runCheck.isPending ? "Checking…" : "Run check"}
          </Button>
        </div>
      </HeaderAction>

      <div className="flex flex-wrap items-center gap-3">
        <Link to="/resumes" className="flex items-center gap-1 text-sm text-muted hover:text-fg">
          <ArrowLeft size={14} aria-hidden="true" />
          All versions
        </Link>
        {version.isCurrent ? (
          <span className="rounded-full bg-ok/15 px-2 py-0.5 text-xs font-medium text-ok">Current</span>
        ) : (
          <Button variant="secondary" size="sm" loading={makeCurrent.isPending} onClick={() => makeCurrent.mutate()}>
            <Check size={14} aria-hidden="true" />
            Make current
          </Button>
        )}

        {/* the trash icon sits at the top right */}
        <button
          type="button"
          aria-label="Delete this version"
          onClick={() => setConfirmingDelete(true)}
          className="ml-auto rounded-lg p-2 text-muted hover:bg-line/40 hover:text-bad focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <p className="min-w-0 break-words text-sm text-muted">{version.note || "No note yet."}</p>
        <button
          type="button"
          aria-label="Edit note"
          onClick={() => setEditingNote(true)}
          className="shrink-0 rounded-lg p-1.5 text-muted hover:bg-line/40 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Pencil size={14} />
        </button>
      </div>

      <CheckPanel
        checks={checks}
        running={runCheck.isPending}
        selectedId={selectedCheckId}
        onSelect={setSelectedCheckId}
      />

      {/* a plain HTML element that opens and closes: the text stays hidden until it is wanted */}
      <details className="rounded-xl border border-line bg-panel">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-accent">
          Show resume text
        </summary>
        <pre className="whitespace-pre-wrap break-words border-t border-line px-4 py-3 font-sans text-sm text-muted">
          {version.text}
        </pre>
      </details>

      <MobileActionBar>
        <Button className="w-full" loading={runCheck.isPending} onClick={() => runCheck.mutate()}>
          {!runCheck.isPending && <Play size={16} aria-hidden="true" />}
          {runCheck.isPending ? "Checking…" : "Run check"}
        </Button>
      </MobileActionBar>

      {editingNote && (
        <EditNoteModal resumeId={id} currentNote={version.note} onClose={() => setEditingNote(false)} />
      )}

      {confirmingDelete && (
        <DeleteVersionModal
          title={versionTitle(version)}
          deleting={remove.isPending}
          error={remove.isError ? errorMessage(remove.error) : ""}
          onConfirm={() => remove.mutate()}
          onClose={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  );
}
