import { Check } from "lucide-react";

import type { TestQuestion } from "../../lib/types";

interface StepRowProps {
  total: number;
  reached: number;
  current: number;
  questions: TestQuestion[]; // the reached questions (to know which are answered)
  onGo: (number: number) => void;
}

// The numbered steps: answered (ticked), the current one, opened ones (click to go back) and not-yet-opened ones.
export default function StepRow({ total, reached, current, questions, onGo }: StepRowProps) {
  return (
    <nav aria-label="Questions" className="shrink-0 overflow-x-auto border-b border-line">
      <ol className="mx-auto flex w-max gap-1.5 px-4 py-3 md:px-6">
        {Array.from({ length: total }, (_, index) => {
          const number = index + 1;
          const question = questions[index];
          const kind =
            number === current ? "current" : number > reached ? "locked" : question?.complete ? "done" : "reached";
          const label = { current: "current", locked: "not opened yet", done: "answered", reached: "opened" }[kind];

          const look = {
            current: "border-accent bg-accent/15 text-fg ring-1 ring-accent",
            done: "border-ok/40 bg-ok/10 text-ok",
            reached: "border-line bg-panel text-fg hover:border-muted",
            locked: "border-dashed border-line text-muted",
          }[kind];

          return (
            <li key={number}>
              <button
                type="button"
                disabled={kind === "locked" || kind === "current"}
                aria-current={kind === "current" ? "step" : undefined}
                aria-label={`Question ${number}, ${label}`}
                onClick={() => onGo(number)}
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${look}`}
              >
                {kind === "done" ? <Check size={14} aria-hidden="true" /> : number}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
