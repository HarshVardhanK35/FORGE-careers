import { MousePointerClick } from "lucide-react";

import { usePageTitle } from "../../context/PageHeaderContext";

// The right side of a split page while nothing is chosen. It also sets the header title,
// so the title goes back to the page name after an item is closed or deleted.
export default function NothingSelected({ title, message }: { title: string; message: string }) {
  usePageTitle(title);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line px-6 py-12 text-center">
      <MousePointerClick size={28} className="text-muted" aria-hidden="true" />
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}
