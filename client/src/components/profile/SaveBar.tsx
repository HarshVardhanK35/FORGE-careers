import { Check, CircleAlert, Pencil, TriangleAlert } from "lucide-react";

import Button from "../ui/Button";

interface SaveBarProps {
  dirty: boolean;
  saving: boolean;
  saveFailed: boolean;
  hasErrors: boolean; // Save was pressed and some fields need fixing
  onDiscard: () => void;
  onSave: () => void;
}

// The one bar at the bottom of the page: what the state is, Discard and Save changes.
export default function SaveBar({ dirty, saving, saveFailed, hasErrors, onDiscard, onSave }: SaveBarProps) {
  let text = "No changes";
  let tone = "text-muted";
  let Icon = Check;

  if (saveFailed) {
    text = "Couldn't save your changes. Check your connection and try again.";
    tone = "text-bad";
    Icon = CircleAlert;
  } else if (dirty && hasErrors) {
    text = "Fix the fields marked in red, then save";
    tone = "text-warn";
    Icon = TriangleAlert;
  } else if (dirty) {
    text = "You have unsaved changes";
    tone = "text-warn";
    Icon = Pencil;
  }

  const off = !dirty || saving;

  // "-bottom-4 -mx-4 -mb-4" cancels the padding of the page area, like the mobile action bar
  return (
    <div className="sticky -bottom-4 -mx-4 -mb-4 mt-auto border-t border-line bg-panel px-4 py-3 md:-bottom-8 md:-mx-8 md:-mb-8 md:px-8">
      <div className="mx-auto flex max-w-228 flex-wrap items-center gap-x-4 gap-y-2">
        <p role="status" aria-live="polite" className={`flex min-w-0 flex-[1_1_240px] items-center gap-2 text-sm max-md:basis-full ${tone}`}>
          <Icon size={16} className="shrink-0" aria-hidden="true" />
          <span>{text}</span>
        </p>

        <div className="flex gap-2 max-md:w-full">
          <Button variant="secondary" disabled={off} onClick={onDiscard} className="max-md:flex-1">
            Discard
          </Button>
          <Button disabled={off} loading={saving} onClick={onSave} className="max-md:flex-1">
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
