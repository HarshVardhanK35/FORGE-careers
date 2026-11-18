import { Plus } from "lucide-react";

import Button from "../ui/Button";
import InfoTip from "../ui/InfoTip";
import type { OnboardingSkill } from "../../lib/types";

interface SlotCardProps {
  // the skill in this slot, or null when the slot is empty
  skill: OnboardingSkill | null;
  categoryLabel: string;
  // an empty required slot says so
  required: boolean;
  onAdd: () => void;
  onChange: () => void;
  onRemove: () => void;
}

// one focus slot: a skill with Change and Remove, or an empty slot with "Add a skill"
export default function SlotCard({ skill, categoryLabel, required, onAdd, onChange, onRemove }: SlotCardProps) {
  if (!skill) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="flex min-h-20 w-full flex-col items-center justify-center gap-0.5 rounded-xl border border-dashed border-line text-sm text-muted hover:border-accent hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
      >
        <span className="inline-flex items-center gap-1.5">
          <Plus size={16} />
          Add a skill
        </span>
        {required && <span className="text-xs text-warn">Required</span>}
      </button>
    );
  }

  return (
    <div className="flex min-h-20 flex-col justify-between gap-1.5 rounded-xl border border-line bg-canvas p-3">
      <div>
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-semibold">{skill.name}</span>
          <span className="mt-0.5">
            <InfoTip label={`About ${skill.name}`} text={skill.description} />
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted">{categoryLabel}</p>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={onChange}>
          Change
        </Button>
        <Button size="sm" variant="ghost" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}
