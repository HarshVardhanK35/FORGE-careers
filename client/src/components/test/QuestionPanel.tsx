import { Lock } from "lucide-react";
import type { ReactNode } from "react";

import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import Button from "../ui/Button";
import type { TestQuestion } from "../../lib/types";

const TEXTAREA =
  "w-full resize-y rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-fg placeholder:text-muted " +
  "focus:border-accent focus:outline-none";

// the label row of one part: its name on the left, something small on the right
function PartHead({ htmlFor, label, right }: { htmlFor?: string; label: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {right}
    </div>
  );
}

interface QuestionPanelProps {
  question: TestQuestion;
  total: number;
  draftA: string;
  draftC: string;
  busy: boolean; // an answer is being saved
  onDraftA: (text: string) => void;
  onDraftC: (text: string) => void;
  onContinue: () => void; // saves Part A (it locks)
  onChoose: (position: number) => void; // saves Part B
}

// One question: the code, then Part A, then Part B once Part A is locked, then Part C once Part B is chosen.
export default function QuestionPanel({
  question,
  total,
  draftA,
  draftC,
  busy,
  onDraftA,
  onDraftC,
  onContinue,
  onChoose,
}: QuestionPanelProps) {
  const locked = question.partA.locked;

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="text-lg font-semibold md:text-xl">
          Question {question.number} of {total}
        </h2>
        <span className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{question.topicTitle}</span>
      </div>

      {question.environment === "browser" && question.html && (
        <CodeBlock code={question.html} label="The page this code runs on (HTML)" />
      )}
      <CodeBlock
        code={question.code}
        label={
          question.environment === "browser"
            ? "Code (runs in the browser)"
            : question.environment === "page"
              ? "The page, opened in a browser window 800 px wide and 600 px high"
              : undefined
        }
      />

      <section className="flex flex-col gap-2">
        <PartHead
          htmlFor="part-a"
          label={<>Part A · <InlineCode text={question.partA.ask} /></>}
          right={
            locked ? (
              <span className="flex items-center gap-1 text-xs text-muted">
                <Lock size={14} aria-hidden="true" />
                Locked
              </span>
            ) : undefined
          }
        />
        {locked ? (
          <div id="part-a" aria-readonly="true" className="whitespace-pre-wrap rounded-lg border border-line bg-panel px-3 py-2 font-mono text-sm">
            {question.partA.answer}
          </div>
        ) : (
          <>
            <textarea
              id="part-a"
              rows={3}
              maxLength={300}
              placeholder={question.environment === "page" ? "Type your answer" : "Type the exact output"}
              value={draftA}
              onChange={(event) => onDraftA(event.target.value)}
              className={`${TEXTAREA} min-h-22 font-mono`}
            />
            <div>
              <Button disabled={!draftA.trim()} loading={busy} onClick={onContinue} className="max-md:min-h-11">
                Continue
              </Button>
            </div>
          </>
        )}
      </section>

      {question.partB && (
        <section className="flex flex-col gap-2">
          <div id="part-b-label" className="text-sm font-medium">
            Part B · <InlineCode text={question.partB.ask} />
          </div>
          <div role="radiogroup" aria-labelledby="part-b-label" className="flex flex-col gap-2">
            {question.partB.options.map((option, position) => {
              const chosen = question.partB?.chosen === position;
              return (
                <button
                  key={position}
                  type="button"
                  role="radio"
                  aria-checked={chosen}
                  onClick={() => onChoose(position)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    chosen ? "border-accent bg-accent/10" : "border-line hover:border-muted"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${chosen ? "border-accent" : "border-muted"}`}
                  >
                    {chosen && <span className="h-2 w-2 rounded-full bg-accent" />}
                  </span>
                  <span>
                    <InlineCode text={option} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {question.partC && (
        <section className="flex flex-col gap-2">
          <PartHead
            htmlFor="part-c"
            label={<>Part C · <InlineCode text={question.partC.ask} /></>}
            right={
              <span className={`text-xs tabular-nums ${draftC.length >= question.partC.maxLength ? "text-warn" : "text-muted"}`}>
                {draftC.length} / {question.partC.maxLength}
              </span>
            }
          />
          <textarea
            id="part-c"
            rows={6}
            maxLength={question.partC.maxLength}
            value={draftC}
            onChange={(event) => onDraftC(event.target.value)}
            className={`${TEXTAREA} min-h-36`}
          />
        </section>
      )}
    </div>
  );
}
