import { useEffect, useState } from "react";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useActivityRenewal } from "../../hooks/useActivityRenewal";
import { keepFocusInside } from "../../lib/focusTrap";

// the warning opens this long before the access token ends
const WARNING_MS = 5 * 60 * 1000;

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// A box that opens 5 minutes before the session ends and offers two choices:
// stay signed in (get a new access token) or sign out.
// It opens only when the user has been inactive: an active user is renewed quietly
// (see useActivityRenewal), so the end time never gets close.
export default function SessionWarning() {
  const { expiresAt, staySignedIn, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [working, setWorking] = useState(false);

  // while the user is active, renew quietly; while the box is open, only the buttons decide
  useActivityRenewal(!open, expiresAt);

  // Whenever the end time changes (sign-in, or a new token after "Stay signed in"),
  // close the box and plan the next warning.
  useEffect(() => {
    setOpen(false);
    if (expiresAt === null) return;

    const delay = Math.max(expiresAt - WARNING_MS - Date.now(), 0);
    const timer = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(timer);
  }, [expiresAt]);

  // While the box is open, count down once a second. At zero the session is over.
  useEffect(() => {
    if (!open || expiresAt === null) return;
    const end = expiresAt;

    function tick() {
      const left = Math.max(Math.round((end - Date.now()) / 1000), 0);
      setSecondsLeft(left);
      if (left === 0) {
        logout({ sessionEnded: true });
      }
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [open, expiresAt]);

  async function handleStay() {
    setWorking(true);
    const ok = await staySignedIn();
    setWorking(false);
    if (ok) setOpen(false);
  }

  if (!open) return null;

  return (
    // the dark layer behind the box; a click on it does nothing, so the box cannot be skipped
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="session-warning-title"
        aria-describedby="session-warning-text"
        onKeyDown={keepFocusInside}
        className="w-full max-w-sm rounded-xl border border-line bg-panel p-6 text-center"
      >
        <h2 id="session-warning-title" className="text-xl font-semibold">
          Your session is about to end
        </h2>

        <p id="session-warning-text" className="mt-3 text-sm text-muted">
          You will be signed out in {formatTime(secondsLeft)}. Stay signed in to keep working.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="secondary" disabled={working} onClick={() => logout({ sessionEnded: true })}>
            Sign out
          </Button>
          <Button autoFocus loading={working} onClick={handleStay}>
            Stay signed in
          </Button>
        </div>
      </div>
    </div>
  );
}
