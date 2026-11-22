import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, ChevronRight, Plus } from "lucide-react";

import JobFacts from "../components/jobs/JobFacts";
import AutoOpenFirst from "../components/layout/AutoOpenFirst";
import SplitLayout from "../components/layout/SplitLayout";
import Button from "../components/ui/Button";
import MobileActionBar from "../components/ui/MobileActionBar";
import { LoadingText } from "../components/ui/Spinner";
import { HeaderAction } from "../context/PageHeaderContext";
import { api } from "../lib/api";
import { formatDate } from "../lib/dates";
import type { JobSummary } from "../lib/types";

// the left side: the saved jobs, newest first, with a button to add one
function JobList() {
  const navigate = useNavigate();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => api.get<JobSummary[]>("/jobs"),
  });

  const addJob = () => navigate("/jobs/new");

  return (
    <div className="flex flex-1 flex-col">
      {/* the header button is for a desktop; a phone has the bar at the bottom */}
      <HeaderAction>
        <div className="hidden md:block">
          <Button size="sm" onClick={addJob}>
            <Plus size={16} />
            Add job
          </Button>
        </div>
      </HeaderAction>

      {isPending && <LoadingText>Loading your jobs…</LoadingText>}

      {isError && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-bad">The jobs could not be loaded.</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {data && data.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <Briefcase size={28} className="text-muted" aria-hidden="true" />
          <p className="text-sm text-muted">No jobs yet. Paste a job description to start.</p>
          <Button onClick={addJob}>
            <Plus size={16} />
            Add job
          </Button>
        </div>
      )}

      {data && data.length > 0 && (
        <ul className="flex flex-col gap-3">
          {data.map((job) => (
            <li key={job._id}>
              {/* NavLink knows when its address is the open one, so the chosen row is highlighted */}
              <NavLink
                to={`/jobs/${job._id}`}
                className={({ isActive }) =>
                  `flex items-stretch gap-3 rounded-xl border bg-panel p-4 focus-visible:outline-2 focus-visible:outline-accent ${
                    isActive ? "border-accent" : "border-line hover:border-muted"
                  }`
                }
              >
                {/* title, then company, then the facts on the last line (mt-auto keeps them at the bottom) */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="break-words text-sm font-medium">{job.title}</p>
                  <p className="mt-0.5 break-words text-sm text-muted">{job.company}</p>
                  <JobFacts location={job.location} source={job.source} className="mt-auto pt-3" />
                </div>
                <div className="flex shrink-0 flex-col items-end justify-between gap-3">
                  <ChevronRight size={16} className="text-muted" aria-hidden="true" />
                  <span className="text-xs text-muted">{formatDate(job.createdAt)}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      {/* phone: a long bar that stays at the bottom, above the tabs */}
      {data && data.length > 0 && (
        <MobileActionBar>
          <Button className="w-full" onClick={addJob}>
            <Plus size={16} />
            Add job
          </Button>
        </MobileActionBar>
      )}
    </div>
  );
}

// the Jobs page: the list on the left and the chosen job (or the add and edit form) on the right
export default function JobsPage() {
  return <SplitLayout basePath="/jobs" list={<JobList />} />;
}

// the right side with no job chosen: on a desktop the newest job opens
export function JobsIndex() {
  const { data, isPending } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => api.get<JobSummary[]>("/jobs"),
  });

  return (
    <AutoOpenFirst
      title="Jobs"
      emptyMessage="No jobs yet. Add one to see its details here."
      basePath="/jobs"
      firstId={data?.[0]?._id}
      loading={isPending}
    />
  );
}
