import { useState } from "react";

import Button from "../ui/Button";
import InfoTip from "../ui/InfoTip";
import Modal from "../ui/Modal";
import SelectMenu from "../ui/SelectMenu";
import type { Category, OnboardingSkill } from "../../lib/types";

const LEVEL_NAME: Record<"P" | "S", string> = { P: "Primary", S: "Secondary" };

// one skill in the list: its name, the suggested level, an info bubble and Select
function PickerRow({ skill, onSelect }: { skill: OnboardingSkill; onSelect: () => void }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span className="text-sm font-medium">{skill.name}</span>

        {skill.tag && (
          <span
            title={`Suggested level: ${LEVEL_NAME[skill.tag]}`}
            className="rounded border border-line px-1.5 text-xs font-semibold text-muted"
          >
            {skill.tag}
          </span>
        )}

        <InfoTip label={`About ${skill.name}`} text={skill.description} />
      </div>

      <Button size="sm" variant="secondary" onClick={onSelect}>
        Select
      </Button>
    </li>
  );
}

interface SkillPickerProps {
  title: string;
  // the skills that fit this slot and are not in focus yet
  skills: OnboardingSkill[];
  categories: Category[];
  onSelect: (skillId: string) => void;
  onClose: () => void;
}

// A modal with a category dropdown; the list below shows the skills of the chosen category.
export default function SkillPicker({ title, skills, categories, onSelect, onClose }: SkillPickerProps) {
  // only the categories that still have skills to pick, each with its count
  const options = categories
    .map((category) => ({ ...category, count: skills.filter((s) => s.category === category.id).length }))
    .filter((option) => option.count > 0);

  // opens on "Language and web basics", or on the first category that has skills
  const [categoryId, setCategoryId] = useState(
    () => options.find((option) => option.id === "language-web")?.id ?? options[0]?.id ?? ""
  );

  const visible = skills.filter((skill) => skill.category === categoryId).sort((a, b) => a.order - b.order);

  return (
    <Modal title={title} onClose={onClose}>
      {options.length === 0 && <p className="text-sm text-muted">No skills are left for this slot.</p>}

      {/* a slot with only one category needs no dropdown */}
      {options.length > 1 && (
        <div className="mb-2">
          <SelectMenu
            label="Category"
            value={categoryId}
            onChange={setCategoryId}
            options={options.map((option) => ({ value: option.id, label: `${option.label} (${option.count})` }))}
          />
        </div>
      )}

      <ul className="divide-y divide-line">
        {visible.map((skill) => (
          <PickerRow key={skill.skillId} skill={skill} onSelect={() => onSelect(skill.skillId)} />
        ))}
      </ul>
    </Modal>
  );
}
