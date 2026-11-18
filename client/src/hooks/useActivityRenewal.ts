import { useEffect, useRef } from "react";

import { useAuth } from "../context/AuthContext";

// while the user is active, get a new access token at most this often
const RENEW_EVERY_MS = 10 * 60 * 1000;

// what counts as activity
const ACTIVITY_EVENTS = ["mousemove", "keydown", "click", "scroll", "touchstart"] as const;

// While the user is active (and "enabled" is true), the session is renewed quietly in the
// background, so the end time keeps moving forward and the session warning never opens.
// When the user stops, the end time stops moving, and the warning opens after
// 10 to 20 minutes of inactivity.
export function useActivityRenewal(enabled: boolean, expiresAt: number | null) {
  const { staySignedIn } = useAuth();

  // useRef: a box for a value that changes without drawing the screen again
  const lastRenewedAt = useRef(Date.now());
  const renewing = useRef(false);

  // a new access token (from any source) restarts the wait before the next renewal
  useEffect(() => {
    lastRenewedAt.current = Date.now();
  }, [expiresAt]);

  useEffect(() => {
    if (!enabled) return;

    async function onActivity() {
      if (renewing.current) return;
      if (Date.now() - lastRenewedAt.current < RENEW_EVERY_MS) return;

      renewing.current = true;
      lastRenewedAt.current = Date.now(); // also the wait before trying again if this fails
      await staySignedIn();
      renewing.current = false;
    }

    // coming back to the tab counts as activity
    function onVisible() {
      if (!document.hidden) onActivity();
    }

    for (const name of ACTIVITY_EVENTS) {
      window.addEventListener(name, onActivity, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      for (const name of ACTIVITY_EVENTS) {
        window.removeEventListener(name, onActivity);
      }
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled]);
}
