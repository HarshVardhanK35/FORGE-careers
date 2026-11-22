import { Lock } from "lucide-react";

import Input from "../ui/Input";
import SelectMenu from "../ui/SelectMenu";
import { AI_MODELS } from "../../lib/profileForm";
import type { CardProps } from "./ProfileCard";

interface SettingsCardProps extends CardProps {
  appliedToday: number; // applications sent today
  aiUsedToday: number;
  savedAiLimit: string; // the limit as saved, for the "Used today" line
}

// The second card: the apply line, the daily goal, the AI limit and model.
export default function SettingsCard({ form, shown, onChange, appliedToday, aiUsedToday, savedAiLimit }: SettingsCardProps) {
  return (
    <section aria-labelledby="title-settings" className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-4 md:p-5">
      <h2 id="title-settings" className="text-base font-semibold">
        Settings
      </h2>

      {/* the three numbers side by side on a wider screen, one under the other on a phone */}
      <div className="grid gap-x-10 gap-y-5 sm:grid-cols-3">
        <Input
          boxWidth="w-28"
          label="Apply line"
          type="number"
          inputMode="numeric"
          min={0}
          max={100}
          counter="0–100"
          rightSlot={<span className="text-sm text-muted">%</span>}
          value={form.applyThreshold}
          onChange={(event) => onChange({ applyThreshold: event.target.value })}
          error={shown("applyThreshold")}
          hint="Jobs that match below this are marked Skip"
        />

        <Input
          boxWidth="w-28"
          label="Daily application goal"
          type="number"
          inputMode="numeric"
          min={1}
          max={50}
          counter="1–50"
          value={form.dailyApplicationGoal}
          onChange={(event) => onChange({ dailyApplicationGoal: event.target.value })}
          error={shown("dailyApplicationGoal")}
          hint={`Shown as 'Today ${appliedToday}/${form.dailyApplicationGoal || "…"}' on Home`}
        />

        <Input
          boxWidth="w-28"
          label="AI daily limit"
          type="number"
          inputMode="numeric"
          min={0}
          max={500}
          counter="0–500"
          value={form.dailyAiCallCap}
          onChange={(event) => onChange({ dailyAiCallCap: event.target.value })}
          error={shown("dailyAiCallCap")}
          hint={`Used today: ${aiUsedToday} of ${savedAiLimit}`}
        />
      </div>

      <div className="max-w-90">
        <SelectMenu
          label="AI model"
          value={form.aiModel}
          options={AI_MODELS}
          onChange={(aiModel) => onChange({ aiModel })}
      />
      </div>

      <p className="flex items-start gap-2 border-t border-line pt-4 text-xs text-muted">
        <Lock size={16} className="shrink-0" aria-hidden="true" />
        Contact details are removed before any text is sent to an AI service.
      </p>
    </section>
  );
}
