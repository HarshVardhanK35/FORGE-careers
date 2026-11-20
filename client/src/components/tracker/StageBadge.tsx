import { STAGE_LABELS } from "../../lib/stages";
import type { Stage } from "../../lib/types";

const TONES: Record<Stage, string> = {
  applied: "bg-line text-muted",
  response_received: "bg-accent/15 text-accent",
  shortlisted: "bg-accent/15 text-accent",
  interviewing: "bg-warn/15 text-warn",
  hold: "bg-line text-muted",
  rejected: "bg-bad/15 text-bad",
  succeeded: "bg-ok/15 text-ok",
};

// A small coloured label with the name of a stage.
export default function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${TONES[stage]}`}>
      {STAGE_LABELS[stage]}
    </span>
  );
}
