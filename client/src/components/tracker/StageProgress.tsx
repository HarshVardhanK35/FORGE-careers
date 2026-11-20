import { Check } from "lucide-react";

import { formatDay } from "../../lib/dates";
import { STAGE_LABELS, WAY as STEPS, furthestStep } from "../../lib/stages";
import type { Stage, StageChange } from "../../lib/types";

type Status = "done" | "current" | "todo";

interface StageProgressProps {
  stage: Stage; // the stage now
  history: StageChange[]; // every stage reached, with its day
}

// A progress bar of five segments (a list on a phone): a step you have passed is ticked, the current
// step is highlighted, and every reached step shows its day. An application that is on hold or
// rejected stops at the last step it reached, and a line under the bar says so.
export default function StageProgress({ stage, history }: StageProgressProps) {
  // the furthest step reached so far (a step can be skipped, for example Applied straight to Interviewing)
  const reached = furthestStep(history);
  const onTheWay = STEPS.includes(stage);

  function statusOf(index: number): Status {
    if (stage === "succeeded") return "done"; // the offer is the end of the way
    if (index < reached) return "done";
    if (index === reached) return onTheWay ? "current" : "done";
    return "todo";
  }

  // the first day each step was reached
  const dayOf = (step: Stage) => history.find((change) => change.stage === step)?.date;

  const stopped = stage === "hold" || stage === "rejected";

  return (
    <div className="flex flex-col gap-3">
      <ol className="flex flex-col gap-3 sm:flex-row sm:gap-2" aria-label="Progress">
        {STEPS.map((step, index) => {
          const status = statusOf(index);
          const day = dayOf(step);
          const bar = {
            done: stage === "succeeded" ? "border-ok" : "border-accent",
            current: "border-accent",
            todo: "border-line",
          }[status];

          return (
            <li
              key={step}
              aria-current={status === "current" ? "step" : undefined}
              // a left bar on a phone, a bar on top on a wider screen
              className={`flex flex-1 flex-col gap-0.5 border-l-4 pl-3 sm:border-l-0 sm:border-t-4 sm:pl-0 sm:pt-2 ${bar}`}
            >
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  status === "todo" ? "text-muted" : status === "current" ? "text-accent" : "text-fg"
                }`}
              >
                {status === "done" && <Check size={12} className="text-ok" aria-hidden="true" />}
                {step === "succeeded" ? "Offer" : STAGE_LABELS[step]}
              </span>
              <span className="text-xs text-muted">{day ? formatDay(day) : status === "current" ? "Now" : "–"}</span>
            </li>
          );
        })}
      </ol>

      {stopped && (
        <p className="text-sm text-muted">
          {stage === "hold" ? "On hold" : "Rejected"}
          {dayOf(stage) && ` since ${formatDay(dayOf(stage) as string)}`}. The bar shows the last step reached.
        </p>
      )}
    </div>
  );
}
