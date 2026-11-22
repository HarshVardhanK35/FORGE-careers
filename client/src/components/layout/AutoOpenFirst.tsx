import { Navigate } from "react-router-dom";

import { useIsDesktop } from "../../hooks/useIsDesktop";
import NothingSelected from "./NothingSelected";

interface AutoOpenFirstProps {
  title: string; // the page name for the header, for example "Jobs"
  emptyMessage: string; // shown when there is nothing to open
  basePath: string; // for example "/jobs"
  firstId: string | undefined; // the item to open (the newest job, the current resume, the newest application)
  loading: boolean;
}

// The right side of a split page when no item is chosen.
// On a desktop it opens the first item at once, so the right side is never empty.
// On a phone it does nothing (the list is the page, and opening an item would hide it).
export default function AutoOpenFirst({ title, emptyMessage, basePath, firstId, loading }: AutoOpenFirstProps) {
  const desktop = useIsDesktop();

  if (desktop && firstId) return <Navigate to={`${basePath}/${firstId}`} replace />;

  return <NothingSelected title={title} message={loading ? "Loading…" : emptyMessage} />;
}
