import type { ReactNode } from "react";
import { X } from "lucide-react";

import { keepFocusInside } from "../../lib/focusTrap";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// A box in the centre of a dimmed page, with a margin around it (also on a phone).
// The parent shows it only while it is open: {open && <Modal ...>}.
// Escape or a click on the dark area closes it; the Tab key stays inside it.
export default function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-md"
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
        className="flex max-h-[85vh] w-full max-w-xl flex-col rounded-xl border border-line bg-panel"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5 md:py-4">
          <h2 className="text-base font-semibold md:text-lg">{title}</h2>
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

        <div className="flex-1 overflow-y-auto px-4 py-3 md:px-5 md:py-4">{children}</div>
      </div>
    </div>
  );
}
