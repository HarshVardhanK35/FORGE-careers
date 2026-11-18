import type { ReactNode } from "react";
import { X } from "lucide-react";

import { keepFocusInside } from "../../lib/focusTrap";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// A box over a dimmed page. It fills the screen on a phone.
// The parent shows it only while it is open: {open && <Modal ...>}.
// Escape or a click on the dark area closes it; the Tab key stays inside it.
export default function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        // a click inside the box must not reach the dark area behind it
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
          else keepFocusInside(event);
        }}
        className="flex h-full w-full flex-col bg-panel sm:h-auto sm:max-h-[85vh] sm:max-w-xl sm:rounded-xl sm:border sm:border-line"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            autoFocus
            aria-label="Close"
            onClick={onClose}
            className="rounded p-1 text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
