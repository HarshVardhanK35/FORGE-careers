import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, ExternalLink, Pencil, Trash2 } from "lucide-react";

import JobFacts from "../components/jobs/JobFacts";
import MatchPanel from "../components/jobs/MatchPanel";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import MobileActionBar from "../components/ui/MobileActionBar";
import { LoadingText } from "../components/ui/Spinner";
import { HeaderAction, usePageTitle } from "../context/PageHeaderContext";
import { useToast } from "../context/ToastContext";
import { api, errorMessage, isApiFailure } from "../lib/api";
import { safeLink } from "../lib/jobs";
import type { ApplicationSummary, Job } from "../lib/types";

// One job: its details, the match with a resume, "Mark as applied", edit and delete.
export default function JobPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const job = useQuery({
    queryKey: ["jobs", id],
    queryFn: () => api.get<Job>(`/jobs/${id}`),
  });

  // the applications tell us whether this job is already marked as applied
  const applications = useQuery({
    queryKey: ["applications"],
    queryFn: () => api.get<ApplicationSummary[]>("/applications"),
  });
  const applied = applications.data?.some((application) => application.jobId._id === id) ?? false;

  const markApplied = useMutation({
    mutationFn: () => api.post("/applications", { jobId: id }), // the server uses the current resume version
    onSuccess: async () => {
      // ["applications"] also matches ["applications", "stats"], so the "Applied today" chip refreshes
      await queryClient.invalidateQueries({ queryKey: ["applications"] });
      showToast("Marked as applied");
    },
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  const remove = useMutation({
    mutationFn: () => api.delete(`/jobs/${id}`),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["jobs", id] });
      queryClient.removeQueries({ queryKey: ["job-matches", id] });
      await queryClient.invalidateQueries({ queryKey: ["jobs"], exact: true });
      navigate("/jobs");
    },
  });

  usePageTitle(job.data ? job.data.title : "Job");

  if (job.isPending) {
    return <LoadingText>Loading this job…</LoadingText>;
  }

  if (job.isError) {
    const notFound = isApiFailure(job.error) && job.error.status === 404;
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-bad">{notFound ? "This job was not found." : "This job could not be loaded."}</p>
        <Link to="/jobs" className="text-sm text-accent hover:underline">
          Back to all jobs
        </Link>
      </div>
    );
  }

  const data = job.data;
  const link = safeLink(data.link);

  const appliedButton = (className: string) =>
    applied ? (
      <span className="inline-flex items-center gap-1 rounded-full bg-ok/15 px-3 py-1 text-xs font-medium text-ok">
        <Check size={12} aria-hidden="true" />
        Applied
      </span>
    ) : (
      <Button className={className} size="sm" loading={markApplied.isPending} onClick={() => markApplied.mutate()}>
        Mark as applied
      </Button>
    );

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      {/* the header button is for a desktop; a phone has the bar at the bottom */}
      <HeaderAction>
        <div className="hidden md:block">{applications.isSuccess && appliedButton("")}</div>
      </HeaderAction>

      {/* the list is on the left on a desktop, so the back link is for a phone only */}
      <Link to="/jobs" className="flex w-fit items-center gap-1 text-sm text-muted hover:text-fg md:hidden">
        <ArrowLeft size={14} aria-hidden="true" />
        All jobs
      </Link>

      <div className="flex flex-col gap-2">
        {/* the title, with the edit and delete icons at the far right on the same line */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 break-words text-xl font-semibold">{data.title}</h2>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Edit this job"
              onClick={() => navigate(`/jobs/${id}/edit`)}
              className="rounded-lg p-2 text-muted hover:bg-line/40 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              aria-label="Delete this job"
              onClick={() => setConfirmingDelete(true)}
              className="rounded-lg p-2 text-muted hover:bg-line/40 hover:text-bad focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* the company, the facts and the link: stacked on a phone, on one line on a desktop */}
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-x-5">
          <p className="break-words text-base text-muted">{data.company}</p>
          <JobFacts location={data.location} source={data.source} salaryRange={data.salaryRange} />
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="flex w-fit items-center gap-1 text-sm text-accent hover:underline"
            >
              Open the job post
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </div>

        {data.note && <p className="break-words text-sm text-muted">Note: {data.note}</p>}
      </div>

      <MatchPanel jobId={id} />

      {/* a plain HTML element that opens and closes: the text stays hidden until it is wanted */}
      <details className="rounded-xl border border-line bg-panel">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-accent">
          Show job description
        </summary>
        <pre className="whitespace-pre-wrap break-words border-t border-line px-4 py-3 font-sans text-sm text-muted">
          {data.description}
        </pre>
      </details>

      {applications.isSuccess && (
        <MobileActionBar>
          {applied ? (
            <p className="text-center text-sm text-ok">Applied</p>
          ) : (
            <Button className="w-full" loading={markApplied.isPending} onClick={() => markApplied.mutate()}>
              Mark as applied
            </Button>
          )}
        </MobileActionBar>
      )}

      {confirmingDelete && (
        <ConfirmModal
          title="Delete this job?"
          message={`${data.title} at ${data.company} and its match results will be deleted. This cannot be undone.`}
          busy={remove.isPending}
          error={remove.isError ? errorMessage(remove.error) : ""}
          onConfirm={() => remove.mutate()}
          onClose={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  );
}
