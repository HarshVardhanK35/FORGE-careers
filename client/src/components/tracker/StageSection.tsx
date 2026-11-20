import { useState } from "react";
import { CircleX, Trophy } from "lucide-react";

import { STAGE_LABELS, STAGE_ORDER, canMoveTo, isFinalStage } from "../../lib/stages";
import type { Stage, StageChange } from "../../lib/types";
import Button from "../ui/Button";
import ConfirmModal from "../ui/ConfirmModal";
import SelectMenu from "../ui/SelectMenu";
import StageProgress from "./StageProgress";

interface StageSectionProps {
  stage: Stage; // the stage now
  history: StageChange[]; // every stage reached, with its day
  busy: boolean; // true while a change is saved
  onUpdate: (stage: Stage) => void;
}

// The stage of an application: the progress bar, and a dropdown with an Update button to change it.
// A rejected or succeeded application is final, so the dropdown is replaced by a note.
// The page gives this a key of the stage, so it starts again with the new stage after an update.
export default function StageSection({ stage, history, busy, onUpdate }: StageSectionProps) {
  const [picked, setPicked] = useState<Stage>(stage);
  const [confirming, setConfirming] = useState<Stage | null>(null); // a final stage waiting for a yes

  // a final stage (rejected or offer received) cannot be undone, so it asks first
  function handleUpdate() {
    if (isFinalStage(picked)) setConfirming(picked);
    else onUpdate(picked);
  }

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4" aria-label="Stage">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Stage</h3>

      <StageProgress stage={stage} history={history} />

      {isFinalStage(stage) ? (
        <p className="text-sm text-muted">
          This application is final ({STAGE_LABELS[stage]}). Its stage cannot change.
        </p>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="sm:w-64">
            <SelectMenu
              label="Change the stage to"
              value={picked}
              // the stage now, and the stages it can still move to (never back to an earlier step)
              options={STAGE_ORDER.filter((name) => name === stage || canMoveTo(name, history)).map((name) => ({
                value: name,
                label: STAGE_LABELS[name],
              }))}
              onChange={(value) => setPicked(value as Stage)}
            />
          </div>
          <Button loading={busy} disabled={picked === stage} onClick={handleUpdate}>
            Update
          </Button>
        </div>
      )}

      {confirming && (
        <ConfirmModal
          title={`Mark as ${STAGE_LABELS[confirming].toLowerCase()}?`}
          message="This is final. The stage cannot change again, and the application cannot be deleted."
          confirmLabel={`Mark as ${STAGE_LABELS[confirming].toLowerCase()}`}
          icon={confirming === "succeeded" ? Trophy : CircleX}
          tone={confirming === "succeeded" ? "primary" : "danger"}
          onConfirm={() => {
            onUpdate(confirming);
            setConfirming(null);
          }}
          onClose={() => setConfirming(null)}
        />
      )}
    </section>
  );
}
