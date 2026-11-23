import { CheckCircle2, ChevronDown, ChevronUp, Circle, CircleDot, Clock, Lock, PlayCircle, SkipForward } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import LevelMarks from "./LevelMarks";
import { skillStatus } from "../../lib/roadmap";
import type { SkillStatus, StatusKind } from "../../lib/roadmap";
import type { RoadmapSkill } from "../../lib/types";

// the colour of the icon, and of the sentence under the name (a blue sentence would shout, so it stays grey)
const ICON_TONE: Record<SkillStatus["tone"], string> = {
  muted: "text-muted",
  ok: "text-ok",
  warn: "text-warn",
  accent: "text-accent",
};
const TEXT_TONE: Record<SkillStatus["tone"], string> = { ...ICON_TONE, accent: "text-muted" };

// the icon at the start of the row follows the kind of status
const KIND_ICON: Record<StatusKind, LucideIcon> = {
  locked: Lock,
  passed: CheckCircle2,
  skipped: SkipForward,
  waiting: Clock,
  ready: PlayCircle,
  soon: Circle,
  progress: CircleDot,
  new: Circle,
};

interface SkillRowProps {
  skill: RoadmapSkill;
  expanded: boolean;
  now: number;
  onToggle: () => void;
  onUnlock: () => void;
}

// One skill in the list: its status, the topic progress, the three level marks and a chevron.
export default function SkillRow({ skill, expanded, now, onToggle, onUnlock }: SkillRowProps) {
  const status = skillStatus(skill, now);
  const Icon = KIND_ICON[status.kind];
  const percent = skill.topicsTotal === 0 ? 0 : Math.round((skill.topicsDone / skill.topicsTotal) * 100);
  const complete = skill.topicsTotal > 0 && skill.topicsDone === skill.topicsTotal;

  return (
    <div
      onClick={onToggle}
      className="flex min-h-16 cursor-pointer items-center gap-3 py-2.5 pl-4 pr-2 hover:bg-muted/5 md:min-h-14"
    >
      <Icon size={20} className={`shrink-0 ${ICON_TONE[status.tone]}`} aria-hidden="true" />

      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-0.5">
          <span className="text-sm font-medium">{skill.name}</span>
          <span className={`flex flex-wrap items-center gap-2 text-xs ${TEXT_TONE[status.tone]}`}>
            {status.text}
            {status.action && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (status.action === "unlock") onUnlock();
                  else onToggle();
                }}
                className="py-0.5 text-xs font-medium text-accent underline underline-offset-2 hover:text-fg"
              >
                {status.action === "unlock" ? "Unlock anyway" : "Take it now"}
              </button>
            )}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden w-28 flex-col gap-1 sm:flex">
            <span className="text-xs text-muted">
              {skill.topicsDone} of {skill.topicsTotal} topics
            </span>
            <div className="h-1 overflow-hidden rounded-sm bg-line">
              <div className={`h-full ${complete ? "bg-ok" : "bg-accent"}`} style={{ width: `${percent}%` }} />
            </div>
          </div>
          <LevelMarks levels={skill.levels} now={now} />
        </div>
      </div>

      <button
        type="button"
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${skill.name}`}
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent md:h-8 md:w-8"
      >
        {expanded ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
