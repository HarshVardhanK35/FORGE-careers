import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import JobForm from "../components/jobs/JobForm";
import { LoadingText } from "../components/ui/Spinner";
import { usePageTitle } from "../context/PageHeaderContext";
import { useToast } from "../context/ToastContext";
import { api, errorMessage } from "../lib/api";
import type { Job, JobInput, SavedJob } from "../lib/types";

const EMPTY_JOB: JobInput = {
  company: "",
  title: "",
  source: "",
  link: "",
  location: "",
  salaryRange: "",
  description: "",
  note: "",
};

// The page to add a job (/jobs/new) and to edit one (/jobs/:id/edit).
export default function JobFormPage() {
  const { id } = useParams(); // there is an id only when a job is edited
  const editing = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  usePageTitle(editing ? "Edit job" : "Add a job");

  // when editing, the saved job is loaded first; "enabled" keeps this query off for a new job
  const job = useQuery({
    queryKey: ["jobs", id],
    queryFn: () => api.get<Job>(`/jobs/${id}`),
    enabled: editing,
  });

  const save = useMutation({
    mutationFn: async (values: JobInput): Promise<string> => {
      if (editing) {
        await api.patch(`/jobs/${id}`, values);
        return id ?? "";
      }
      const saved = await api.post<SavedJob>("/jobs", values);
      if (saved.duplicate) showToast("Saved. You already had a job with this company and title.");
      else showToast("Job saved");
      return saved.job._id;
    },
    onSuccess: async (jobId) => {
      // ["jobs"] also matches ["jobs", id], so the list and the job page both reload
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      if (editing) showToast("Job updated");
      navigate(`/jobs/${jobId}`);
    },
  });

  const backTo = editing ? `/jobs/${id}` : "/jobs";

  let content;
  if (editing && job.isPending) {
    content = <LoadingText>Loading the job…</LoadingText>;
  } else if (editing && job.isError) {
    content = <p className="text-sm text-bad">The job could not be loaded.</p>;
  } else {
    const saved = job.data;
    content = (
      <JobForm
        // a new key rebuilds the form with the loaded values
        key={saved?._id ?? "new"}
        initial={
          saved
            ? {
                company: saved.company,
                title: saved.title,
                source: saved.source,
                link: saved.link,
                location: saved.location,
                salaryRange: saved.salaryRange,
                description: saved.description,
                note: saved.note,
              }
            : EMPTY_JOB
        }
        heading={editing ? "Edit job" : "Add a job"}
        submitLabel={editing ? "Save changes" : "Save job"}
        saving={save.isPending}
        error={save.isError ? errorMessage(save.error) : ""}
        onSubmit={(values) => save.mutate(values)}
        onCancel={() => navigate(backTo)}
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4">
      {/* a new job: the list is on the left on a desktop, so the link is for a phone only */}
      <Link
        to={backTo}
        className={`flex w-fit items-center gap-1 text-sm text-muted hover:text-fg ${editing ? "" : "md:hidden"}`}
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {editing ? "Back to the job" : "All jobs"}
      </Link>
      {content}
    </div>
  );
}
