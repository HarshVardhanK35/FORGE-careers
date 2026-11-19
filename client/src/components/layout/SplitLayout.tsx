import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";

interface SplitLayoutProps {
  basePath: string; // the address of the list, for example "/resumes"
  list: ReactNode; // the left panel
}

// A list on the left and the chosen item on the right (a desktop, from 768px wide).
// The right side is the child route (<Outlet />). On a phone there is room for one side only:
// the list at the base address, and the chosen item (with a back link) at any address below it.
export default function SplitLayout({ basePath, list }: SplitLayoutProps) {
  const { pathname } = useLocation();
  const atList = pathname.replace(/\/$/, "") === basePath;

  return (
    <div className="flex min-h-full flex-col md:h-full md:min-h-0 md:flex-row md:gap-6">
      <aside
        className={`${atList ? "flex" : "hidden"} flex-1 flex-col md:flex md:w-80 md:flex-none md:overflow-y-auto md:border-r md:border-line md:pr-6 lg:w-96`}
      >
        {list}
      </aside>

      <section
        className={`${atList ? "hidden" : "flex"} min-w-0 flex-1 flex-col md:flex md:overflow-y-auto md:pr-4`}
      >
        <Outlet />
      </section>
    </div>
  );
}
