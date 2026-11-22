import GapsEditor from "./GapsEditor";
import Input from "../ui/Input";
import { NAME_MAX, ROLE_MAX } from "../../lib/profileForm";
import type { FieldKey, FormErrors, ProfileFormState } from "../../lib/profileForm";

export interface CardProps {
  form: ProfileFormState;
  errors: FormErrors;
  // the error text of a field, or "" when it should not be shown yet
  shown: (key: FieldKey) => string;
  onChange: (patch: Partial<ProfileFormState>) => void;
}

// a red message under a field; nothing when the text is empty
function ErrorLine({ text }: { text: string }) {
  return text ? <p className="text-xs text-bad">{text}</p> : null;
}

// The first card: name, role, experience, hours a day and the career gaps.
export default function ProfileCard({ form, errors, shown, onChange }: CardProps) {
  return (
    <section aria-labelledby="title-profile" className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-4 md:p-5">
      <h2 id="title-profile" className="text-base font-semibold">
        Profile
      </h2>

      <Input
        label="Your name"
        autoComplete="given-name"
        counter={`${form.name.length}/${NAME_MAX}`}
        value={form.name}
        onChange={(event) => onChange({ name: event.target.value })}
        error={shown("name")}
        aria-required="true"
      />

      <Input
        label="Target role"
        counter={`${form.targetRole.length}/${ROLE_MAX}`}
        value={form.targetRole}
        onChange={(event) => onChange({ targetRole: event.target.value })}
        error={shown("targetRole")}
      />

      {/* two sections side by side, close together */}
      <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-medium">Years of experience</legend>
          <div className="flex gap-3">
            <div className="w-22">
              <Input
                label="Years"
                type="number"
                inputMode="numeric"
                min={0}
                max={40}
                counter="0–40"
                value={form.years}
                onChange={(event) => onChange({ years: event.target.value })}
                invalid={!!shown("years")}
              />
            </div>
            <div className="w-22">
              <Input
                label="Months"
                type="number"
                inputMode="numeric"
                min={0}
                max={11}
                counter="0–11"
                value={form.months}
                onChange={(event) => onChange({ months: event.target.value })}
                invalid={!!shown("months")}
              />
            </div>
          </div>
          {/* the messages sit under both boxes, so a narrow box does not squeeze them */}
          <ErrorLine text={shown("years")} />
          <ErrorLine text={shown("months")} />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-medium">Hours a day</legend>
          <div className="w-22">
            <Input
              label="Hours"
              type="number"
              inputMode="numeric"
              min={0}
              max={24}
              counter="0–24"
              value={form.hours}
              onChange={(event) => onChange({ hours: event.target.value })}
              invalid={!!shown("hours")}
            />
          </div>
          <ErrorLine text={shown("hours")} />
        </fieldset>
      </div>

      <GapsEditor gaps={form.gaps} errors={errors.gaps} onChange={(gaps) => onChange({ gaps })} />
    </section>
  );
}
