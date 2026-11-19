import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, Pencil, Play, Trash2 } from "lucide-react";

import CheckPanel from "../components/resumes/CheckPanel";
import EditNoteModal from "../components/resumes/EditNoteModal";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
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
    <div className="flex w-full flex-1 flex-col gap-4">
      {/* the header button is for a desktop; a phone has the bar at the bottom */}
      <HeaderAction>
        <div className="hidden md:block">
          <Button size="sm" loading={runCheck.isPending} onClick={() => runCheck.mutate()}>
            {!runCheck.isPending && <Play size={14} aria-hidden="true" />}
            {runCheck.isPending ? "Checking…" : "Run check"}
          </Button>
        </div>
      </HeaderAction>

      {/* the list is on the left on a desktop, so the back link is for a phone only */}
      <Link to="/resumes" className="flex w-fit items-center gap-1 text-sm text-muted hover:text-fg md:hidden">
        <ArrowLeft size={14} aria-hidden="true" />
        All versions
      </Link>

      {/* the note with its edit icon, and the trash icon at the far right on the same line */}
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
        <button
          type="button"
          aria-label="Delete this version"
          onClick={() => setConfirmingDelete(true)}
          className="ml-auto shrink-0 rounded-lg p-1.5 text-muted hover:bg-line/40 hover:text-bad focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* the status of this version: green when it is the current one, blue with a button when it is not */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
          version.isCurrent ? "border-ok/40 bg-ok/10" : "border-accent/40 bg-accent/10"
        }`}
      >
        {version.isCurrent ? (
          <>
            <p className="flex items-center gap-2 text-sm font-medium text-ok">
              <Check size={16} aria-hidden="true" />
              Current version
            </p>
            <p className="text-xs text-muted">Used when you mark a job as applied.</p>
          </>
        ) : (
          <>
            <p className="text-sm">This is not the current version.</p>
            <Button
              size="sm"
              className="max-md:w-full"
              loading={makeCurrent.isPending}
              onClick={() => makeCurrent.mutate()}
            >
              <Check size={14} aria-hidden="true" />
              Make current
            </Button>
          </>
        )}
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
        <ConfirmModal
          title="Delete this version?"
          message={`${versionTitle(version)} and its checks will be deleted. This cannot be undone.`}
          note="Later versions are renumbered."
          busy={remove.isPending}
          error={remove.isError ? errorMessage(remove.error) : ""}
          onConfirm={() => remove.mutate()}
          onClose={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  );
}
