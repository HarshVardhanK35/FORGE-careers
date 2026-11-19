import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, FileText, Plus } from "lucide-react";

import SplitLayout from "../components/layout/SplitLayout";
import NewVersionModal from "../components/resumes/NewVersionModal";
import Button from "../components/ui/Button";
import MobileActionBar from "../components/ui/MobileActionBar";
import { LoadingText } from "../components/ui/Spinner";
import { HeaderAction } from "../context/PageHeaderContext";
import { api } from "../lib/api";
import { formatDate } from "../lib/dates";
import { versionTitle } from "../lib/resumes";
import type { ResumeSummary } from "../lib/types";

// the left side: the versions, newest first, with a button to add one
function ResumeList() {
  const [adding, setAdding] = useState(false);

  // useQuery: loads the list, keeps it in a cache and tells us if it is loading or failed
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["resumes"],
    queryFn: () => api.get<ResumeSummary[]>("/resumes"),
  });

  const nextNumber = data && data.length > 0 ? data[0].versionNumber + 1 : 1;

  return (
    <div className="flex flex-1 flex-col">
      {/* the header button is for a desktop; a phone has the bar at the bottom */}
      <HeaderAction>
        <div className="hidden md:block">
          <Button size="sm" onClick={() => setAdding(true)}>
            <Plus size={16} />
            New version
          </Button>
        </div>
      </HeaderAction>

      {isPending && <LoadingText>Loading your resume versions…</LoadingText>}

      {isError && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-bad">The resume versions could not be loaded.</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}

      {data && data.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <FileText size={28} className="text-muted" aria-hidden="true" />
          <p className="text-sm text-muted">No resume yet. Paste your resume text to get started.</p>
          <Button onClick={() => setAdding(true)}>
            <Plus size={16} />
            New version
          </Button>
        </div>
      )}

      {data && data.length > 0 && (
        <ul className="flex flex-col gap-3">
          {data.map((resume) => (
            <li key={resume._id}>
              {/* NavLink knows when its address is the open one, so the chosen row is highlighted */}
              <NavLink
                to={`/resumes/${resume._id}`}
                className={({ isActive }) =>
                  `flex items-stretch gap-3 rounded-xl border bg-panel p-4 focus-visible:outline-2 focus-visible:outline-accent ${
                    isActive ? "border-accent" : "border-line hover:border-muted"
                  }`
                }
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="break-words text-sm font-medium">{versionTitle(resume)}</span>
                    {resume.isCurrent && (
                      <span className="rounded-full bg-ok/15 px-2 py-0.5 text-xs font-medium text-ok">Current</span>
                    )}
                  </div>
                  {resume.note && <p className="mt-1 break-words text-sm text-muted">{resume.note}</p>}
                </div>
                {/* the arrow at the top right, the date at the bottom right */}
                <div className="flex shrink-0 flex-col items-end justify-between gap-3">
                  <ChevronRight size={16} className="text-muted" aria-hidden="true" />
                  <span className="text-xs text-muted">{formatDate(resume.createdAt)}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      {/* phone: a long bar that stays at the bottom, above the tabs */}
      {data && data.length > 0 && (
        <MobileActionBar>
          <Button className="w-full" onClick={() => setAdding(true)}>
            <Plus size={16} />
            New version
          </Button>
        </MobileActionBar>
      )}

      {adding && <NewVersionModal nextNumber={nextNumber} onClose={() => setAdding(false)} />}
    </div>
  );
}

// the Resumes page: the list on the left and the chosen version on the right
export default function ResumesPage() {
  return <SplitLayout basePath="/resumes" list={<ResumeList />} />;
}
