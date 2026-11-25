import { Check, Triangle } from "lucide-react";

import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

export type SaveStatus = "saved" | "saving" | "error";

// The slim top bar of the test: the title, whether the last answer is saved, and Exit.
export default function TestTopBar({
  title,
  status,
  onExit,
}: {
  title: string;
  status: SaveStatus | null; // null hides it (while loading)
  onExit: (() => void) | null; // null hides Exit
}) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line px-4 md:px-6">
      <h1 className="min-w-0 flex-1 truncate text-sm font-medium">{title}</h1>

      {status === "saving" && (
        <span role="status" aria-live="polite" className="flex items-center gap-1.5 text-xs text-muted">
          <Spinner size={12} />
          Saving…
        </span>
      )}
      {status === "saved" && (
        <span role="status" aria-live="polite" className="flex items-center gap-1.5 text-xs text-muted">
          <Check size={14} aria-hidden="true" />
          Saved
        </span>
      )}
      {status === "error" && (
        <span role="status" aria-live="polite" className="flex items-center gap-1.5 text-xs text-bad">
          <Triangle size={14} aria-hidden="true" />
          Not saved
        </span>
      )}

      {onExit && (
        <Button variant="secondary" size="sm" onClick={onExit}>
          Exit
        </Button>
      )}
    </header>
  );
}
