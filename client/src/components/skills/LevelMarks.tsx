import { Check, Circle, CircleDot, Lock, SkipForward } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { markOf } from "../../lib/roadmap";
import type { MarkKind } from "../../lib/roadmap";
import type { RoadmapLevel } from "../../lib/types";

const MARKS: Record<MarkKind, { icon: LucideIcon; label: string; classes: string }> = {
  locked: { icon: Lock, label: "locked", classes: "border border-line text-muted" },
  open: { icon: Circle, label: "open", classes: "border border-accent/60 text-accent" },
  progress: { icon: CircleDot, label: "in progress", classes: "border border-transparent bg-accent/15 text-accent" },
  passed: { icon: Check, label: "passed", classes: "border border-transparent bg-ok/15 text-ok" },
  skipped: { icon: SkipForward, label: "skipped", classes: "border border-dashed border-warn/60 text-warn" },
};

// the three small marks L1, L2 and L3 of a skill
export default function LevelMarks({ levels, now }: { levels: RoadmapLevel[]; now: number }) {
  return (
    <div className="flex gap-1">
      {levels.map((level) => {
        const mark = MARKS[markOf(level, now)];
        const Icon = mark.icon;
        return (
          <span
            key={level.level}
            title={`L${level.level} ${mark.label}`}
            aria-label={`L${level.level} ${mark.label}`}
            className={`inline-flex h-[22px] items-center gap-0.5 rounded-md px-1.5 text-xs font-semibold ${mark.classes}`}
          >
            <Icon size={12} aria-hidden="true" />L{level.level}
          </span>
        );
      })}
    </div>
  );
}
