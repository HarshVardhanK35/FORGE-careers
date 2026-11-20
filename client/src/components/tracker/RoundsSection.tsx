import { useState } from "react";
import { CircleCheck, CircleX, Clock, Pencil, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { formatDate } from "../../lib/dates";
import { ROUND_RESULT_LABELS, ROUND_TYPE_LABELS } from "../../lib/stages";
import type { Round, RoundResult } from "../../lib/types";
import Button from "../ui/Button";
import ClampedText from "./ClampedText";
import RoundModal from "./RoundModal";

const RESULTS: Record<RoundResult, { tone: string; Icon: LucideIcon }> = {
  pending: { tone: "bg-line text-muted", Icon: Clock },
  passed: { tone: "bg-ok/15 text-ok", Icon: CircleCheck },
  failed: { tone: "bg-bad/15 text-bad", Icon: CircleX },
};

interface RoundsSectionProps {
  applicationId: string;
  rounds: Round[];
}

// The interview rounds of an application as a timeline: a numbered dot for each round on a thin
// line, then the type, the day, the result, and the notes and feedback (3 lines each, "Show more").
export default function RoundsSection({ applicationId, rounds }: RoundsSectionProps) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Round | null>(null);

  const ordered = [...rounds].sort((a, b) => a.number - b.number);

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4" aria-label="Interview rounds">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Interview rounds</h3>
        <Button variant="secondary" size="sm" onClick={() => setAdding(true)}>
          <Plus size={14} aria-hidden="true" />
          Add round
        </Button>
      </div>

      {ordered.length === 0 ? (
        <p className="text-sm text-muted">No rounds yet. Add one when an interview is scheduled.</p>
      ) : (
        <ol>
          {ordered.map((round, index) => {
            const { tone, Icon } = RESULTS[round.result];
            const last = index === ordered.length - 1;

            return (
              <li key={round._id} className={`flex gap-2 md:gap-3 ${last ? "" : "pb-5"}`}>
                {/* the numbered dot (a little smaller on a phone), and the line down to the next round */}
                <div className="flex flex-col items-center">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-canvas text-xs font-semibold md:h-7 md:w-7">
                    {round.number}
                  </span>
                  {!last && <span className="mt-1 w-px flex-1 bg-line" aria-hidden="true" />}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    {/* the title, with the edit pencil at the far right on the same line */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium">{ROUND_TYPE_LABELS[round.type]} round</span>
                      <button
                        type="button"
                        aria-label={`Edit round ${round.number}`}
                        onClick={() => setEditing(round)}
                        className="-mt-1.5 shrink-0 rounded-lg p-1.5 text-muted hover:bg-line/40 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-xs text-muted">{formatDate(round.date)}</span>
                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}
                      >
                        <Icon size={12} aria-hidden="true" />
                        {ROUND_RESULT_LABELS[round.result]}
                      </span>
                    </div>
                  </div>

                  {round.notes && <ClampedText label="Notes" text={round.notes} />}
                  {round.feedback && <ClampedText label="Feedback" text={round.feedback} accent />}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {adding && <RoundModal applicationId={applicationId} onClose={() => setAdding(false)} />}
      {editing && <RoundModal applicationId={applicationId} round={editing} onClose={() => setEditing(null)} />}
    </section>
  );
}
