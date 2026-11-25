import type { LucideIcon } from "lucide-react";

import Button from "../ui/Button";

// A card in the middle of the page: the load error and the "not open yet" message.
export default function CenteredCard({
  icon: Icon,
  tone,
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  tone: "bad" | "muted";
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-6">
      <div role="alert" className="flex w-full max-w-100 flex-col items-start gap-4 rounded-xl border border-line bg-panel p-6">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            tone === "bad" ? "bg-bad/15 text-bad" : "bg-muted/15 text-muted"
          }`}
        >
          <Icon size={20} aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm text-muted">{message}</p>
        </div>
        <Button className="max-md:w-full" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
