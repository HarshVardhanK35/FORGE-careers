import { formatDateTime } from "../../lib/dates";
import type { JobMatch } from "../../lib/types";
import SkillChips from "./SkillChips";

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

      <SkillChips title="Matched required skills" skills={match.matchedRequired} tone="ok" />
      <SkillChips title="Missing required skills" skills={match.missingRequired} tone="bad" />
      <SkillChips title="Matched nice-to-have skills" skills={match.matchedNiceToHave} tone="ok" />
      <SkillChips title="Missing nice-to-have skills" skills={match.missingNiceToHave} tone="muted" />

      {match.yearsNote && <p className="text-sm text-muted">{match.yearsNote}</p>}
    </div>
  );
}
