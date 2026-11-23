import { Check, CircleDashed, Folder } from "lucide-react";

import type { RoadmapProject } from "../../lib/types";

// The CastWise and FORGE parts: how many study flows are done, and whether the part is ready.
export default function ProjectsSection({ projects }: { projects: RoadmapProject[] }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-baseline gap-2 text-xs font-semibold tracking-widest text-muted">
        PROJECTS
        <span className="font-normal tracking-normal">{projects.length} parts</span>
      </h2>

      <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
        {projects.map((project) => {
          const percent = project.flowsTotal === 0 ? 0 : Math.round((project.flowsStudied / project.flowsTotal) * 100);
          return (
            <div key={project.id} className="flex min-h-16 flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 md:min-h-14">
              <div className="flex min-w-0 flex-[1_1_180px] items-center gap-3 text-sm font-medium">
                <Folder size={20} className="shrink-0 text-muted" aria-hidden="true" />
                {project.name}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex w-36 flex-col gap-1">
                  <span className="text-xs text-muted">
                    {project.flowsTotal === 0
                      ? "No flows yet"
                      : `Flows studied ${project.flowsStudied} of ${project.flowsTotal}`}
                  </span>
                  <div className="h-1 overflow-hidden rounded-sm bg-line">
                    <div className={`h-full ${project.ready ? "bg-ok" : "bg-accent"}`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
                <span
                  className={`inline-flex h-6 min-w-23 items-center justify-center gap-1 rounded-full px-2 text-xs font-medium ${
                    project.ready ? "bg-ok/15 text-ok" : "border border-line text-muted"
                  }`}
                >
                  {project.ready ? <Check size={12} strokeWidth={3} aria-hidden="true" /> : <CircleDashed size={12} aria-hidden="true" />}
                  {project.ready ? "Ready" : "Not ready"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
