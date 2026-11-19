import type { ReactNode } from "react";

import { formatDateTime } from "../../lib/dates";
import type { JobMatch } from "../../lib/types";

// a row of small chips for a list of skills; nothing is shown for an empty list
function Chips({ title, skills, tone }: { title: string; skills: string[]; tone: "ok" | "bad" | "muted" }): ReactNode {
  if (skills.length === 0) return null;

  const toneClass = {
    ok: "border-ok/40 text-ok",
    bad: "border-bad/40 text-bad",
    muted: "border-line text-muted",
  }[tone];

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h4>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className={`rounded-full border px-3 py-1 text-xs ${toneClass}`}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface MatchResultProps {
  match: JobMatch;
  resumeTitle: string; // for example "Resume v3", or an empty text when that version is gone
}

// The result of one match: the percent, apply or skip, and the skills that match or are missing.
export default function MatchResult({ match, resumeTitle }: MatchResultProps) {
  const apply = match.decision === "apply";

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-semibold">{Math.round(match.percent)}%</span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
            apply ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn"
          }`}
        >
          {apply ? "Apply" : "Skip"}
        </span>
        <span className="text-xs text-muted">Your apply line is {match.threshold}%</span>
      </div>

      <p className="text-xs text-muted">
        {resumeTitle && `${resumeTitle} · `}
        {match.source} · {formatDateTime(match.createdAt)}
      </p>

      <Chips title="Matched required skills" skills={match.matchedRequired} tone="ok" />
      <Chips title="Missing required skills" skills={match.missingRequired} tone="bad" />
      <Chips title="Matched nice-to-have skills" skills={match.matchedNiceToHave} tone="ok" />
      <Chips title="Missing nice-to-have skills" skills={match.missingNiceToHave} tone="muted" />

      {match.yearsNote && <p className="text-sm text-muted">{match.yearsNote}</p>}
    </div>
  );
}
