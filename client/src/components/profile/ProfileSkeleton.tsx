// the grey blocks shown while the profile and settings load (the same cards as the loaded page)
function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted/15 ${className}`} />;
}

export default function ProfileSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading your profile" className="mx-auto flex max-w-180 flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 md:p-5">
        <Bar className="h-5 w-24" />
        <Bar className="h-3 w-30" />
        <Bar className="h-9" />
        <Bar className="h-3 w-30" />
        <Bar className="h-9" />
        <div className="flex gap-3">
          <Bar className="h-9 w-22" />
          <Bar className="h-9 w-22" />
          <Bar className="ml-5 h-9 w-22" />
        </div>
        <Bar className="h-30 bg-muted/10" />
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 md:p-5">
        <Bar className="h-5 w-24" />
        <Bar className="h-9 w-26" />
        <Bar className="h-9 w-26" />
        <Bar className="h-9 w-26" />
        <Bar className="h-9 max-w-90" />
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 md:p-5">
        <Bar className="h-5 w-24" />
        <Bar className="h-9" />
      </div>
    </div>
  );
}
