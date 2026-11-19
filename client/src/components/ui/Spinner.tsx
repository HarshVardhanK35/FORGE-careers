import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

// The spinning loading icon.
export default function Spinner({ size = 16 }: { size?: number }) {
  return <LoaderCircle size={size} className="animate-spin" aria-hidden="true" />;
}

// A line of muted text with the spinner in front of it, for example "Loading the checks…".
export function LoadingText({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted">
      <Spinner />
      {children}
    </p>
  );
}
