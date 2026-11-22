import { useId } from "react";
import { CalendarDays, ChevronDown, CircleAlert, Plus, Trash2 } from "lucide-react";

import Button from "../ui/Button";
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  FIRST_YEAR,
  GAP_TEXT_MAX,
  MAX_GAPS,
  MONTHS,
  newGap,
} from "../../lib/profileForm";
import type { FormErrors, GapForm } from "../../lib/profileForm";

const YEARS = Array.from({ length: CURRENT_YEAR - FIRST_YEAR + 1 }, (_, index) => FIRST_YEAR + index);

// a drop-down box that fills its room; the arrow is our own icon, so it has room on the right
const SELECT_CLASS =
  "w-full appearance-none rounded-lg border bg-canvas py-2 pl-3 pr-8 text-sm text-fg focus:border-accent focus:outline-none ";

interface GapRowProps {
  gap: GapForm;
  number: number;
  errors: FormErrors["gaps"][string] | undefined;
  onChange: (patch: Partial<GapForm>) => void;
  onRemove: () => void;
}

// a month and a year, as two dropdowns
function MonthYear({
  legend,
  month,
  year,
  invalid,
  onMonth,
  onYear,
}: {
  legend: string;
  month: number;
  year: number;
  invalid: boolean;
  onMonth: (month: number) => void;
  onYear: (year: number) => void;
}) {
  const border = invalid ? "border-bad" : "border-line";

  return (
    <fieldset className="flex min-w-0 flex-1 basis-64 items-center gap-2">
      <legend className="sr-only">{legend}</legend>
      <span aria-hidden="true" className="w-9 text-xs text-muted">
        {legend}
      </span>
      <div className="relative min-w-0 flex-1">
        <select
          aria-label={`${legend} month`}
          value={month}
          onChange={(event) => onMonth(Number(event.target.value))}
          className={SELECT_CLASS + border}
        >
          {MONTHS.map((name, index) => (
            // a month that has not come yet cannot be chosen in the current year
            <option key={name} value={index + 1} disabled={year === CURRENT_YEAR && index + 1 > CURRENT_MONTH}>
              {name}
            </option>
          ))}
        </select>
        <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
      <div className="relative min-w-0 flex-1">
        <select
          aria-label={`${legend} year`}
          value={year}
          onChange={(event) => onYear(Number(event.target.value))}
          className={SELECT_CLASS + border}
        >
          {YEARS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </fieldset>
  );
}

function GapRow({ gap, number, errors, onChange, onRemove }: GapRowProps) {
  const id = useId();
  const textError = errors?.text;
  const rangeError = errors?.range;

  return (
    <li className={`flex flex-col gap-2 rounded-lg border p-3 ${textError || rangeError ? "border-bad/50" : "border-line"}`}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium">
          Gap {number}
        </label>
        <span className={`text-xs ${gap.text.length > GAP_TEXT_MAX ? "text-bad" : "text-muted"}`}>
          {gap.text.length}/{GAP_TEXT_MAX}
        </span>
      </div>

      <div className="flex gap-2">
        <input
          id={id}
          value={gap.text}
          placeholder="What happened, in a few words"
          aria-invalid={textError ? true : undefined}
          onChange={(event) => onChange({ text: event.target.value })}
          className={
            "min-w-0 flex-1 rounded-lg border bg-canvas px-3 py-2 text-sm text-fg placeholder:text-muted " +
            "focus:border-accent focus:outline-none " +
            (textError ? "border-bad" : "border-line")
          }
        />
        <button
          type="button"
          aria-label={`Remove gap ${number}`}
          onClick={onRemove}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-muted hover:border-bad hover:text-bad focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Trash2 size={16} />
        </button>
      </div>
      {textError && <FieldError text={textError} />}

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <MonthYear
          legend="From"
          month={gap.fromMonth}
          year={gap.fromYear}
          invalid={!!rangeError}
          onMonth={(fromMonth) => onChange({ fromMonth })}
          onYear={(fromYear) => onChange({ fromYear })}
        />
        <MonthYear
          legend="To"
          month={gap.toMonth}
          year={gap.toYear}
          invalid={!!rangeError}
          onMonth={(toMonth) => onChange({ toMonth })}
          onYear={(toYear) => onChange({ toYear })}
        />
      </div>
      {rangeError && <FieldError text={rangeError} />}
    </li>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <p role="alert" className="flex items-center gap-1 text-xs text-bad">
      <CircleAlert size={12} aria-hidden="true" />
      {text}
    </p>
  );
}

interface GapsEditorProps {
  gaps: GapForm[];
  errors: FormErrors["gaps"];
  onChange: (gaps: GapForm[]) => void;
}

// The list of career gaps: up to 10, each with a short text and a From and a To month.
export default function GapsEditor({ gaps, errors, onChange }: GapsEditorProps) {
  const full = gaps.length >= MAX_GAPS;

  return (
    <div className="flex flex-col gap-3">
      <h3 id="career-gaps-title" className="text-sm font-medium">
        Career gaps
      </h3>

      {gaps.length === 0 ? (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-line px-4 py-5 text-sm text-muted">
          <CalendarDays size={18} aria-hidden="true" />
          No gaps added
        </div>
      ) : (
        <ul aria-labelledby="career-gaps-title" className="flex flex-col gap-2">
          {gaps.map((gap, index) => (
            <GapRow
              key={gap.id}
              gap={gap}
              number={index + 1}
              errors={errors[gap.id]}
              onChange={(patch) => onChange(gaps.map((other) => (other.id === gap.id ? { ...other, ...patch } : other)))}
              onRemove={() => onChange(gaps.filter((other) => other.id !== gap.id))}
            />
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" disabled={full} onClick={() => onChange([...gaps, newGap()])}>
          <Plus size={12} aria-hidden="true" />
          Add a gap
        </Button>
        <span className="text-xs text-muted">{gaps.length} of {MAX_GAPS}</span>
      </div>
    </div>
  );
}
