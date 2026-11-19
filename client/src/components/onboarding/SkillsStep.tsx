import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import SkillPicker from "./SkillPicker";
import SlotCard from "./SlotCard";
import { useOnboarding } from "../../hooks/useOnboarding";
import { api, errorMessage } from "../../lib/api";
import type { Bucket, FocusLimits, Layer, OnboardingData, OnboardingSkill } from "../../lib/types";

// the three groups of focus slots; "bucket" is the level a skill gets when it is put in the group
interface Group {
  key: keyof FocusLimits;
  title: string;
  hint: string;
  layer: Layer;
  bucket: Bucket;
}

const GROUPS: Group[] = [
  { key: "technicalPrimary", title: "Technical Primary", hint: "in depth", layer: "technical", bucket: "primary" },
  { key: "technicalSecondary", title: "Technical Secondary", hint: "interview level", layer: "technical", bucket: "secondary" },
  { key: "professional", title: "Professional", hint: "behavioural", layer: "professional", bucket: "primary" },
];

// which skill the picker is choosing for: a group, and the skill being replaced (if any)
interface PickerState {
  group: Group;
  replaceId: string | null;
}

interface SkillsFormProps {
  data: OnboardingData;
  onBack: () => void;
}

function SkillsForm({ data, onBack }: SkillsFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // the level of every skill, starting with what the server preselected
  const [choices, setChoices] = useState<Record<string, Bucket>>(() =>
    Object.fromEntries(data.skills.map((skill) => [skill.skillId, skill.bucket]))
  );
  const [picker, setPicker] = useState<PickerState | null>(null);

  const { limits, minimumTechnicalPrimary } = data.focus;

  // the skills that fill a group's slots
  function skillsIn(group: Group): OnboardingSkill[] {
    return data.skills
      .filter((skill) => {
        if (skill.layer !== group.layer) return false;
        const level = choices[skill.skillId];
        return group.layer === "technical" ? level === group.bucket : level !== "later";
      })
      .sort((a, b) => a.order - b.order);
  }

  const primaryCount = skillsIn(GROUPS[0]).length;
  const enoughPrimary = primaryCount >= minimumTechnicalPrimary;

  function categoryLabel(skill: OnboardingSkill): string {
    return data.categories.find((category) => category.id === skill.category)?.label ?? "";
  }

  function remove(skillId: string) {
    setChoices({ ...choices, [skillId]: "later" });
  }

  // a chosen skill goes into the group; a replaced skill goes back to Later
  function select(skillId: string) {
    if (!picker) return;
    const next = { ...choices };
    if (picker.replaceId) next[picker.replaceId] = "later";
    next[skillId] = picker.group.bucket;
    setChoices(next);
    setPicker(null);
  }

  // the skills the picker offers: this group's layer, and not in focus yet
  const pickerSkills = picker
    ? data.skills.filter((skill) => skill.layer === picker.group.layer && choices[skill.skillId] === "later")
    : [];

  const finish = useMutation({
    // only the skills in focus are sent; the server puts every other skill in Later
    mutationFn: () =>
      api.put("/onboarding", {
        buckets: Object.entries(choices)
          .filter(([, bucket]) => bucket !== "later")
          .map(([skillId, bucket]) => ({ skillId, bucket })),
      }),
    onSuccess: () => {
      // mark onboarding as complete in the cache, so the app does not send us back here
      queryClient.setQueryData<OnboardingData>(["onboarding"], (old) =>
        old ? { ...old, onboardingComplete: true } : old
      );
      navigate("/", { replace: true });
    },
  });

  const finishError = finish.error ? errorMessage(finish.error) : "";

  // one group: its heading with the count, and its slots in a row
  // (columnsClass sets how many slots sit side by side on a wide screen)
  function renderGroup(group: Group, columnsClass: string) {
    const limit = limits[group.key];
    const filled = skillsIn(group);
    const slots = Array.from({ length: limit }, (_, index) => filled[index] ?? null);
    const range = group.key === "technicalPrimary" ? `${minimumTechnicalPrimary} to ${limit}` : `up to ${limit}`;

    return (
      <section>
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-xs font-semibold uppercase leading-tight tracking-wide text-muted">
            {group.title} ({range}) · {group.hint}
          </h2>
          <span className="shrink-0 text-xs text-muted">
            {filled.length}/{limit}
          </span>
        </div>

        <div className={`mt-2 grid gap-3 ${columnsClass}`}>
          {slots.map((skill, index) => (
            <SlotCard
              key={skill?.skillId ?? `empty-${index}`}
              skill={skill}
              categoryLabel={skill ? categoryLabel(skill) : ""}
              required={group.key === "technicalPrimary" && index < minimumTechnicalPrimary}
              onAdd={() => setPicker({ group, replaceId: null })}
              onChange={() => skill && setPicker({ group, replaceId: skill.skillId })}
              onRemove={() => skill && remove(skill.skillId)}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted">
        Pick up to 6 skills to work on now. Everything else waits in Later; the recommended ones are chosen.
      </p>

      {/* the three groups, one under the other; the slots line up in three columns */}
      <div className="mt-3">{renderGroup(GROUPS[0], "sm:grid-cols-3")}</div>
      <div className="mt-3">{renderGroup(GROUPS[1], "sm:grid-cols-3")}</div>
      <div className="mt-3">{renderGroup(GROUPS[2], "sm:grid-cols-3")}</div>

      <div className="mt-3 flex flex-col gap-2">
        {!enoughPrimary && (
          <p className="text-sm text-warn">
            Fill at least {minimumTechnicalPrimary} Technical Primary slots to finish.
          </p>
        )}
        {finishError && (
          <p role="alert" className="text-sm text-bad">
            {finishError}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onBack} disabled={finish.isPending}>
            Back
          </Button>
          <Button onClick={() => finish.mutate()} loading={finish.isPending} disabled={!enoughPrimary}>
            {finish.isPending ? "Saving…" : "Finish"}
          </Button>
        </div>
      </div>

      {picker && (
        <SkillPicker
          title={`Choose a skill for ${picker.group.title}`}
          skills={pickerSkills}
          categories={data.categories}
          onSelect={select}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  );
}

// Step 2: loads the skills and the user's choices, then shows the slots
export default function SkillsStep({ onBack }: { onBack: () => void }) {
  const onboarding = useOnboarding();

  if (onboarding.isPending) {
    return (
      <div role="status" aria-label="Loading" className="flex justify-center py-8 text-muted">
        <Spinner size={24} />
      </div>
    );
  }

  if (onboarding.isError) {
    return <p className="text-sm text-bad">Could not load the skills. Please reload the page.</p>;
  }

  return <SkillsForm data={onboarding.data} onBack={onBack} />;
}
