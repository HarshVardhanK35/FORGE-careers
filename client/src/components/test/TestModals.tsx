import { CircleCheck, Flag, Hourglass, LogOut } from "lucide-react";

import Button from "../ui/Button";
import ConfirmModal from "../ui/ConfirmModal";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import type { TestResult } from "../../lib/types";

// "Finish the test?"
export function FinishModal({ error, onConfirm, onClose }: { error: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <ConfirmModal
      title="Finish the test?"
      message="You can't change your answers after this."
      confirmLabel="Finish"
      icon={Flag}
      tone="primary"
      error={error}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}

// "Leave the test?" (the answers are saved, so he can continue later)
export function ExitModal({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
  return (
    <ConfirmModal
      title="Leave the test?"
      message="Your answers are saved and you can continue later."
      confirmLabel="Leave"
      icon={LogOut}
      tone="primary"
      onConfirm={onLeave}
      onClose={onStay}
    />
  );
}

// shown while the typed answers are marked; it cannot be closed
export function MarkingModal() {
  return (
    <Modal title="Marking your answers" onClose={() => undefined} compact>
      <div className="flex flex-col items-start gap-4 p-6" role="status" aria-live="polite">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Spinner size={20} />
        </div>
        <h2 className="text-lg font-semibold">Marking your answers…</h2>
      </div>
    </Modal>
  );
}

// the score as "19" or "18.8"
function showPoints(points: number): string {
  return Number.isInteger(points) ? String(points) : points.toFixed(1);
}

// The result: passed or not passed, the score, the time, and what is next.
export function ResultModal({ result, level, onBack }: { result: TestResult; level: number; onBack: () => void }) {
  const minutes = Math.max(1, Math.round(result.activeMs / 60000));
  const next = result.passed
    ? level < 3
      ? `Level ${level + 1} is now open.`
      : "The next skill is now open."
    : `Next attempt opens in ${result.waitHours} hours.`;

  return (
    <Modal title={result.passed ? "Passed" : "Not passed"} onClose={() => undefined} compact>
      <div className="flex flex-col items-start gap-4 p-6">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            result.passed ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn"
          }`}
        >
          {result.passed ? <CircleCheck size={20} aria-hidden="true" /> : <Hourglass size={20} aria-hidden="true" />}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{result.passed ? "Passed" : "Not passed"}</h2>
          <p className="text-base tabular-nums">
            {showPoints(result.points)} of {result.total} · needed {result.needed}
          </p>
          <p className="text-sm text-muted">Time: {minutes} min</p>
          <p className="text-sm">{next}</p>
        </div>
        <Button autoFocus className="max-md:w-full" onClick={onBack}>
          Back to Skills
        </Button>
      </div>
    </Modal>
  );
}
