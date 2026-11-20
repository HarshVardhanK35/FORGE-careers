import { CircleAlert, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Button from "./Button";
import Modal from "./Modal";

interface ConfirmModalProps {
  title: string; // for example "Delete this version?"
  message: string; // what will happen
  note?: string; // a smaller line under the message
  confirmLabel?: string; // the text of the main button
  icon?: LucideIcon; // the icon of the heading and of the main button (a trash by default)
  tone?: "danger" | "primary"; // red for something destructive, blue for a normal question
  busy?: boolean; // true while the request runs
  error?: string; // the message of a failed request, or an empty text
  onConfirm: () => void;
  onClose: () => void;
}

const ICON_TONES = {
  danger: "bg-bad/15 text-bad",
  primary: "bg-accent/15 text-accent",
};

// Asks before something that cannot be undone: an icon, the question and what will happen, and two buttons.
// The page runs the request; this only draws the question. Focus starts on Cancel (the safe choice).
export default function ConfirmModal({
  title,
  message,
  note,
  confirmLabel = "Delete",
  icon: Icon = Trash2,
  tone = "danger",
  busy = false,
  error = "",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal title={title} onClose={onClose} compact>
      <div className="flex flex-col gap-3 p-5">
        {/* the icon and the question on one line, so the text below can use the full width */}
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${ICON_TONES[tone]}`}>
            <Icon size={18} aria-hidden="true" />
          </div>
          <h2 className="min-w-0 text-base font-semibold">{title}</h2>
        </div>

        <p className="text-sm text-muted">{message}</p>
        {note && <p className="-mt-1 text-xs text-muted">{note}</p>}

        {error && (
          <p
            role="alert"
            className="flex items-center gap-2 rounded-lg border border-bad/40 bg-bad/10 px-3 py-2 text-sm text-bad"
          >
            <CircleAlert size={16} className="shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
        <Button variant="secondary" autoFocus className="max-md:flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={tone} className="max-md:flex-1" loading={busy} onClick={onConfirm}>
          {!busy && <Icon size={16} aria-hidden="true" />}
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
