// One number with a small label, for the top of the Home page.
export default function StatCard({ label, value, goal }: { label: string; value: number; goal?: number }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-line bg-panel p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="text-2xl font-semibold">
        {value}
        {goal !== undefined && <span className="text-base font-normal text-muted">/{goal}</span>}
      </p>
    </div>
  );
}
