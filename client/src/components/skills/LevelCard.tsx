import { BookOpenText, CircleCheck, ExternalLink, Hourglass, Lock, PlayCircle, SkipForward } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import InfoTip from "../ui/InfoTip";
import { formatWait, stateNow } from "../../lib/roadmap";
import type { LevelState, RoadmapLevel } from "../../lib/types";

const STATE_LOOK: Record<LevelState, { icon: LucideIcon; label: string; text: string; badge: string; border: string }> = {
  locked: { icon: Lock, label: "Locked", text: "text-muted", badge: "bg-muted/15 text-muted", border: "border-line" },
  open: { icon: PlayCircle, label: "Ready", text: "text-accent", badge: "bg-accent/15 text-accent", border: "border-accent/50" },
  waiting: { icon: Hourglass, label: "Waiting", text: "text-warn", badge: "bg-warn/15 text-warn", border: "border-line" },
  passed: { icon: CircleCheck, label: "Passed", text: "text-ok", badge: "bg-ok/15 text-ok", border: "border-line" },
  skipped: { icon: SkipForward, label: "Skipped", text: "text-warn", badge: "bg-warn/15 text-warn", border: "border-dashed border-warn/50" },
};

const LINK_BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const PRIMARY_LINK = `${LINK_BASE} w-full bg-accent px-4 py-2 text-white hover:bg-accent/90`;
const SECONDARY_LINK = `${LINK_BASE} w-full border border-line bg-panel px-4 py-2 text-fg hover:bg-line/40`;

// the sentence under "Attempt"
function attemptText(level: RoadmapLevel, state: LevelState): string {
  const next = level.attempts + 1;
  const set = level.attemptSet ? `fixed set ${level.attemptSet}` : "random questions";
  if (state === "passed") return `Passed on attempt ${level.attempts}`;
  if (state === "skipped") return "Not taken";
  if (state === "locked") return "Not started";
  if (state === "waiting") return `Next: attempt ${next} · ${set}`;
  return `Attempt ${next} · ${set}`;
}

// One level of a skill: its pass mark, attempt, best score, and what can be done now.
export default function LevelCard({ skillId, level, now }: { skillId: string; level: RoadmapLevel; now: number }) {
  const state = stateNow(level, now);
  const look = STATE_LOOK[state];
  const StateIcon = look.icon;
  const testHref = `/skills/${skillId}/test?level=${level.level}`;
  const passMark = level.level === 3 ? `about ${level.passMark}%` : `${level.passMark}%`;

  return (
    <div className={`flex flex-col gap-3 rounded-xl border bg-panel p-4 ${look.border}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${look.badge}`}>L{level.level}</span>
        <span className="text-base font-semibold">{level.name}</span>
        <span className={`ml-auto inline-flex items-center gap-1 text-xs font-medium ${look.text}`}>
          <StateIcon size={14} aria-hidden="true" />
          {look.label}
        </span>
      </div>

      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
        <dt className="text-muted">Pass mark</dt>
        <dd>
          {passMark} <span className="text-muted">· {level.needed} of {level.total} correct</span>
        </dd>

        <dt className="text-muted">Attempt</dt>
        <dd className="flex items-start gap-1.5">
          <span className="min-w-0 flex-1">{attemptText(level, state)}</span>
          <InfoTip
            label="About attempts and waiting times"
            text={`Attempts 1 to 3 use fixed sets. From attempt 4, questions are drawn at random. After a failed attempt, the next one opens after ${level.waitHours} hours.`}
          />
        </dd>

        <dt className="text-muted">Best score</dt>
        <dd className="tabular-nums">{level.bestScore !== null ? `${level.bestScore}%` : "—"}</dd>
      </dl>

      <div className="mt-auto flex flex-col gap-2">
        {state === "open" && (
          <a href={testHref} target="_blank" rel="noopener" className={PRIMARY_LINK}>
            Take test
            <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}

        {state === "waiting" && level.nextAttemptAt && (
          <div role="timer" className="flex items-center gap-2 rounded-lg bg-warn/12 px-3 py-2 text-sm font-medium text-warn">
            <Hourglass size={16} aria-hidden="true" />
            Next attempt in {formatWait(new Date(level.nextAttemptAt).getTime() - now)}
          </div>
        )}

        {state === "passed" && (
          <a
            href={`/skills/${skillId}/practice?level=${level.level}`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 py-2 text-sm font-medium text-accent hover:underline"
          >
            <BookOpenText size={16} aria-hidden="true" />
            Practice sets and answers
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}

        {state === "skipped" &&
          (level.canTake ? (
            <a href={testHref} target="_blank" rel="noopener" className={SECONDARY_LINK}>
              Take it now
              <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <>
              <button
                type="button"
                disabled
                className={`${LINK_BASE} w-full cursor-not-allowed border border-line bg-panel px-4 py-2 text-fg opacity-45`}
              >
                Take it now
              </button>
              <span className="text-xs text-muted">{level.reason}.</span>
            </>
          ))}

        {state === "locked" && (
          <p className="flex items-center gap-2 py-2 text-sm text-muted">
            <Lock size={16} aria-hidden="true" />
            {level.reason}
          </p>
        )}
      </div>
    </div>
  );
}
