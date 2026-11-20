import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../lib/api";
import type { JobMatch } from "../../lib/types";
import SkillChips from "../jobs/SkillChips";
import { LoadingText } from "../ui/Spinner";

interface MatchSummaryProps {
  jobId: string;
  className?: string;
}

// The newest match of the job of an application: the percent, the advice and the missing skills
// (the skills to revise before an interview). It reads the same data as the job page.
export default function MatchSummary({ jobId, className = "" }: MatchSummaryProps) {
  const matches = useQuery({
    queryKey: ["job-matches", jobId],
    queryFn: () => api.get<JobMatch[]>(`/job-matches?jobId=${jobId}`),
  });

  const latest = matches.data?.[0]; // the server sends the newest first

  return (
    <section
      className={`flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 ${className}`}
      aria-label="Match"
    >
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Match with your resume</h3>

      {matches.isPending && <LoadingText>Loading the match…</LoadingText>}
      {matches.isError && <p className="text-sm text-bad">The match could not be loaded.</p>}

      {matches.isSuccess && !latest && (
        <p className="text-sm text-muted">
          No match yet.{" "}
          <Link to={`/jobs/${jobId}`} className="text-accent hover:underline">
            Run one on the job page
          </Link>
        </p>
      )}

      {latest && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold">{Math.round(latest.percent)}%</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                latest.decision === "apply" ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn"
              }`}
            >
              {latest.decision === "apply" ? "Apply" : "Skip"}
            </span>
          </div>

          {latest.missingRequired.length > 0 ? (
            <SkillChips title="Missing required skills: revise these" skills={latest.missingRequired} tone="bad" />
          ) : (
            <p className="text-sm text-ok">No required skill is missing.</p>
          )}
        </>
      )}
    </section>
  );
}
