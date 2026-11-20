import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BellRing, ChevronRight, ListChecks } from "lucide-react";

import SplitLayout from "../components/layout/SplitLayout";
import StageBadge from "../components/tracker/StageBadge";
import Button from "../components/ui/Button";
import SelectMenu from "../components/ui/SelectMenu";
import { LoadingText } from "../components/ui/Spinner";
import { api } from "../lib/api";
import { formatDate, isDue } from "../lib/dates";
import { STAGE_LABELS, STAGE_ORDER, isFinalStage } from "../lib/stages";
import type { ApplicationStats, ApplicationSummary } from "../lib/types";

const ALL = "all";

// the left side: the applications, newest first, with a filter by stage
function ApplicationList() {
  const [stage, setStage] = useState<string>(ALL);

  // the numbers for the filter ("Applied (4)"); the same data as the "Applied today" chip
  const stats = useQuery({
    queryKey: ["applications", "stats"],
    queryFn: () => api.get<ApplicationStats>("/applications/stats"),
  });

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["applications", "list", stage],
    queryFn: () => api.get<ApplicationSummary[]>(stage === ALL ? "/applications" : `/applications?stage=${stage}`),
  });

  const counts = stats.data?.perStage;
  const options = [
    { value: ALL, label: stats.data ? `All (${stats.data.total})` : "All" },
    ...STAGE_ORDER.map((name) => ({
      value: name,
      label: counts ? `${STAGE_LABELS[name]} (${counts[name]})` : STAGE_LABELS[name],
    })),
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <SelectMenu label="Stage" value={stage} options={options} onChange={setStage} />

      {isPending && <LoadingText>Loading your applications…</LoadingText>}

      {isError && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-bad">The applications could not be loaded.</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {data && data.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <ListChecks size={28} className="text-muted" aria-hidden="true" />
          {stage === ALL ? (
            <>
              <p className="text-sm text-muted">Nothing tracked yet. Mark a job as applied to see it here.</p>
              <Link to="/jobs">
                <Button variant="secondary" tabIndex={-1}>
                  Go to Jobs
                </Button>
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted">No applications in this stage.</p>
          )}
        </div>
      )}

      {data && data.length > 0 && (
        <ul className="flex flex-col gap-3">
          {data.map((application) => (
            <li key={application._id}>
              {/* NavLink knows when its address is the open one, so the chosen row is highlighted */}
              <NavLink
                to={`/tracker/${application._id}`}
                className={({ isActive }) =>
                  `flex items-stretch gap-3 rounded-xl border bg-panel p-4 focus-visible:outline-2 focus-visible:outline-accent ${
                    isActive ? "border-accent" : "border-line hover:border-muted"
                  }`
                }
              >
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="break-words text-sm font-medium">{application.jobId.title}</p>
                  <p className="mt-0.5 break-words text-sm text-muted">{application.jobId.company}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                    <StageBadge stage={application.stage} />
                    {/* a follow-up that is due today or earlier (a final application needs none) */}
                    {!isFinalStage(application.stage) && isDue(application.followUpDate) && (
                      <span className="flex items-center gap-1 rounded-full bg-warn/15 px-2 py-0.5 text-xs font-medium text-warn">
                        <BellRing size={12} aria-hidden="true" />
                        Follow up
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-between gap-3">
                  <ChevronRight size={16} className="text-muted" aria-hidden="true" />
                  <span className="text-xs text-muted">{formatDate(application.appliedAt)}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// the Tracker page: the list on the left and the chosen application on the right
export default function TrackerPage() {
  return <SplitLayout basePath="/tracker" list={<ApplicationList />} />;
}
