import { useState } from "react";

import { isDue, istDateKey } from "../../lib/dates";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface FollowUpSectionProps {
  followUpDate?: string; // the saved date, if there is one
  busy: boolean; // true while a change is saved
  onSave: (date: string | null) => void; // a day like 2026-11-25, or null to clear it
}

// The day to follow up on an application: a date field with Save and Clear.
// The page gives this a key of the saved date, so it starts again after a save.
export default function FollowUpSection({ followUpDate, busy, onSave }: FollowUpSectionProps) {
  const saved = followUpDate ? istDateKey(followUpDate) : "";
  const [date, setDate] = useState(saved);

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4" aria-label="Follow-up">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Follow-up</h3>
        {isDue(followUpDate) && (
          <span className="rounded-full bg-warn/15 px-2 py-0.5 text-xs font-medium text-warn">Due now</span>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="sm:w-64">
          <Input label="Follow-up date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button loading={busy} disabled={!date || date === saved} onClick={() => onSave(date)}>
            Save
          </Button>
          {saved && (
            <Button variant="secondary" disabled={busy} onClick={() => onSave(null)}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
