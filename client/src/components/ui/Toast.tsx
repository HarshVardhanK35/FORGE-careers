import { CircleAlert, CircleCheck, X } from "lucide-react";

interface ToastProps {
  kind: "success" | "error";
  message: string;
  onClose: () => void;
}

// The toast itself. On a phone it sits above the bottom bar and the tabs; on a desktop, at the bottom right.
// An error uses role="alert" (a screen reader reads it at once); a success uses role="status" (read politely).
export default function Toast({ kind, message, onClose }: ToastProps) {
  const isError = kind === "error";

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-32 z-[60] flex justify-center md:inset-x-auto md:bottom-6 md:right-6 md:max-w-sm">
      <div
        role={isError ? "alert" : "status"}
        className={`pointer-events-auto flex w-fit max-w-full items-center gap-2 rounded-lg border bg-panel px-3 py-2 shadow-lg md:items-start md:gap-3 md:rounded-xl md:p-4 ${
          isError ? "border-bad/60" : "border-ok/60"
        }`}
      >
        {isError ? (
          <CircleAlert size={18} className="mt-0.5 shrink-0 text-bad" aria-hidden="true" />
        ) : (
          <CircleCheck size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
        )}
        <p className="min-w-0 flex-1 break-words text-xs md:text-sm">{message}</p>
        <button
          type="button"
          aria-label="Close message"
          onClick={onClose}
          className="shrink-0 rounded p-0.5 text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
