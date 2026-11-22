import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BellRing, ChevronRight, Plus } from "lucide-react";
import type { ReactNode } from "react";

import StatCard from "../components/home/StatCard";
import StageBadge from "../components/tracker/StageBadge";
import Button from "../components/ui/Button";
import MobileActionBar from "../components/ui/MobileActionBar";
import { LoadingText } from "../components/ui/Spinner";
import { HeaderAction, usePageTitle } from "../context/PageHeaderContext";
import { api } from "../lib/api";
import { formatDate, istDateKey } from "../lib/dates";
import { STAGE_LABELS, STAGE_ORDER } from "../lib/stages";
import type { ApplicationStats, ApplicationSummary, FollowUp, Settings } from "../lib/types";

// a titled box
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-line bg-panel p-4" aria-label={title}>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h2>
      {children}
    </section>
  );
}

// how many applications went out in the last 7 days (today included), counted in India time
function lastSevenDays(perDay: ApplicationStats["perDay"]): number {
  const days = new Set<string>();
  for (let i = 0; i < 7; i++) days.add(istDateKey(new Date(Date.now() - i * 86_400_000).toISOString()));
  return perDay.filter((day) => days.has(day.date)).reduce((sum, day) => sum + day.count, 0);
}

// The Home page: a few numbers, the follow-ups that are due, the stages, and the latest 3 applications.
export default function HomePage() {
  usePageTitle("Home");
  const navigate = useNavigate();

  const stats = useQuery({
    queryKey: ["applications", "stats"],
    queryFn: () => api.get<ApplicationStats>("/applications/stats"),
  });

  // the daily goal is a setting (Profile page)
  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: () => api.get<Settings>("/settings"),
  });

  const followUps = useQuery({
    queryKey: ["applications", "follow-ups"],
    queryFn: () => api.get<FollowUp[]>("/applications/follow-ups"),
  });

  // the same cached list as the Tracker page; only the newest five are shown here
  const recent = useQuery({
    queryKey: ["applications", "list", "all"],
    queryFn: () => api.get<ApplicationSummary[]>("/applications"),
  });

  const addJob = () => navigate("/jobs/new");

  return (
    <div className="flex min-h-full flex-col gap-4">
      {/* the header button is for a desktop; a phone has the bar at the bottom */}
      <HeaderAction>
        <div className="hidden md:block">
          <Button size="sm" onClick={addJob}>
            <Plus size={16} />
            Add job
          </Button>
        </div>
      </HeaderAction>

      {stats.isPending && <LoadingText>Loading your numbers…</LoadingText>}
      {stats.isError && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-bad">The numbers could not be loaded.</p>
          <Button variant="secondary" size="sm" onClick={() => stats.refetch()}>
            Try again
          </Button>
        </div>
      )}

      {stats.data && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Today" value={stats.data.today} goal={settings.data?.dailyApplicationGoal} />
            <StatCard label="This week" value={lastSevenDays(stats.data.perDay)} />
            <StatCard label="Total" value={stats.data.total} />
          </div>

          <div className="grid items-start gap-4 lg:grid-cols-3">
            {/* on a phone these two boxes come first; on a wide screen they sit on the right */}
            <div className="flex flex-col gap-4 lg:order-2">
            <Section title="Follow-ups due">
              {followUps.isPending && <LoadingText>Loading…</LoadingText>}
              {followUps.isError && <p className="text-sm text-bad">The follow-ups could not be loaded.</p>}
              {followUps.data && followUps.data.length === 0 && (
                <p className="text-sm text-muted">Nothing due today.</p>
              )}
              {followUps.data && followUps.data.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {followUps.data.map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/tracker/${item._id}`}
                        className="flex items-center gap-2 rounded-lg border border-line bg-canvas p-3 hover:border-muted focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        <BellRing size={14} className="shrink-0 text-warn" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block break-words text-sm font-medium">{item.jobId.title}</span>
                          <span className="block break-words text-xs text-muted">{item.jobId.company}</span>
                        </span>
                        {item.followUpDate && (
                          <span className="shrink-0 text-xs text-muted">{formatDate(item.followUpDate)}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="Stages">
              <ul className="flex flex-col">
                {STAGE_ORDER.map((stage) => (
                  <li key={stage}>
                    {/* a click opens the Tracker on that stage */}
                    <Link
                      to={`/tracker?stage=${stage}`}
                      className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 hover:bg-line/40 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="text-sm">{STAGE_LABELS[stage]}</span>
                      <span className="text-sm font-semibold">{stats.data.perStage[stage]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
            </div>

            <div className="lg:order-1 lg:col-span-2">
          <Section title="Recent applications">
            {recent.isPending && <LoadingText>Loading…</LoadingText>}
            {recent.isError && <p className="text-sm text-bad">The applications could not be loaded.</p>}
            {recent.data && recent.data.length === 0 && (
              <div className="flex flex-col items-start gap-3">
                <p className="text-sm text-muted">Nothing yet. Add a job, and mark it as applied.</p>
                <Button variant="secondary" size="sm" onClick={addJob}>
                  <Plus size={14} aria-hidden="true" />
                  Add job
                </Button>
              </div>
            )}
            {recent.data && recent.data.length > 0 && (
              <ul className="flex flex-col gap-2">
                {recent.data.slice(0, 3).map((application) => (
                  <li key={application._id}>
                    <Link
                      to={`/tracker/${application._id}`}
                      className="flex items-center gap-3 rounded-lg border border-line bg-canvas p-3 hover:border-muted focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block break-words text-sm font-medium">{application.jobId.title}</span>
                        <span className="block break-words text-xs text-muted">{application.jobId.company}</span>
                      </span>
                      <StageBadge stage={application.stage} />
                      <span className="hidden shrink-0 text-xs text-muted sm:inline">
                        {formatDate(application.appliedAt)}
                      </span>
                      <ChevronRight size={16} className="shrink-0 text-muted" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Section>
            </div>
          </div>
        </>
      )}

      <MobileActionBar>
        <Button className="w-full" onClick={addJob}>
          <Plus size={16} />
          Add job
        </Button>
      </MobileActionBar>
    </div>
  );
}
