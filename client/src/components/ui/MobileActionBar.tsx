import type { ReactNode } from "react";

// On a phone, the main action of a page is a long bar that stays at the bottom, above the tabs.
// On a desktop it is not shown (the action is in the header instead).
// "-bottom-4 -mx-4 -mb-4" cancels the 16px padding of the page area, so the bar touches its edges.
export default function MobileActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky -bottom-4 -mx-4 -mb-4 mt-auto border-t border-line bg-panel p-3 md:hidden">
      {children}
    </div>
  );
}
