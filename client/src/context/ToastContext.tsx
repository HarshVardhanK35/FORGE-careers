import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import Toast from "../components/ui/Toast";

// A toast is a small message at the edge of the screen. It tells the user the result of an action.
// Any page can call showToast("...") to show one; only one toast is shown at a time.

export type ToastKind = "success" | "error";

interface ToastItem {
  id: number; // a new number for every toast, so the same text twice still restarts the timer
  kind: ToastKind;
  message: string;
}

interface ToastValue {
  showToast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

const SUCCESS_SECONDS = 4;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);

  function showToast(message: string, kind: ToastKind = "success") {
    setToast({ id: Date.now(), kind, message });
  }

  // a success message goes away by itself; an error stays until the user closes it
  useEffect(() => {
    if (!toast || toast.kind === "error") return;
    const timer = setTimeout(() => setToast(null), SUCCESS_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast kind={toast.kind} message={toast.message} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastValue {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return value;
}
