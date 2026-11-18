import { useQuery } from "@tanstack/react-query";

import { api } from "../../lib/api";

interface ApplicationStats {
  today: number;
}

// "Applied today: 15" on a desktop, "15 today" on a phone
export default function AppliedTodayChip() {
  // useQuery asks the server, remembers the answer (the cache), and tells us
  // whether it is still loading or failed. The key names this piece of data,
  // so other pages can ask for the same data or refresh it by that name.
  const { data } = useQuery({
    queryKey: ["applications", "stats"],
    queryFn: () => api.get<ApplicationStats>("/applications/stats"),
  });

  // while loading, or if the call failed, the chip is simply not shown
  if (!data) return null;

  return (
    <span className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
      <span className="hidden md:inline">Applied today: </span>
      <span className="text-fg">{data.today}</span>
      <span className="md:hidden"> today</span>
    </span>
  );
}
