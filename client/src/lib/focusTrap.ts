import type { KeyboardEvent } from "react";

// Keeps the Tab key inside a box: from the last button it goes back to the first,
// and Shift+Tab from the first goes to the last. Used by modals.
export function keepFocusInside(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== "Tab") return;

  const buttons = event.currentTarget.querySelectorAll<HTMLElement>(
    "button:not(:disabled), select:not(:disabled), input:not(:disabled), a[href]"
  );
  if (buttons.length === 0) return;

  const first = buttons[0];
  const last = buttons[buttons.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
