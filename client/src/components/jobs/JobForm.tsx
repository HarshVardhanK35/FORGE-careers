import { useState } from "react";
import type { FormEvent } from "react";

import { JOB_LIMITS } from "../../lib/jobs";
import type { JobInput } from "../../lib/types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

interface JobFormProps {
  heading: string; // "Add a job" or "Edit job"
  initial: JobInput; // the starting values: empty for a new job, the saved values for an edit
  submitLabel: string; // "Save job" or "Save changes"
  saving: boolean; // true while the request runs
  error: string; // the message of a failed save, or an empty text
  onSubmit: (values: JobInput) => void;
  onCancel: () => void;
}

// true when the text is a full link, for example https://example.com/job/1
function isLink(text: string): boolean {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
}

// The form used to add a job and to edit one. The page decides what happens on submit.
// The fields sit in a card, and the buttons stay at the bottom of the screen while the form scrolls.
export default function JobForm({ heading, initial, submitLabel, saving, error, onSubmit, onCancel }: JobFormProps) {
  const [values, setValues] = useState<JobInput>(initial);
  const [tried, setTried] = useState(false); // after the first submit, problems are shown

  // changes one field and keeps the others
  function change(field: keyof JobInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  const problems = {
    company: values.company.trim() ? "" : "Enter the company.",
    title: values.title.trim() ? "" : "Enter the job title.",
    link: !values.link.trim() || isLink(values.link.trim()) ? "" : "Enter a full link, for example https://…",
    description: !values.description.trim()
      ? "Paste the job description."
      : values.description.length > JOB_LIMITS.description
        ? "This is too long. Shorten it to 20,000 characters or fewer."
        : "",
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTried(true);
    if (Object.values(problems).some(Boolean)) return;

    onSubmit({
      company: values.company.trim(),
      title: values.title.trim(),
      source: values.source.trim(),
      link: values.link.trim(),
      location: values.location.trim(),
      salaryRange: values.salaryRange.trim(),
      description: values.description.trim(),
      note: values.note.trim(),
    });
  }

  // the counter on the label row of a field, for example "12/50"
  const count = (field: "company" | "title" | "source" | "location" | "salaryRange" | "link" | "note") =>
    `${values[field].length}/${JOB_LIMITS[field]}`;

  // a problem is shown only after the first submit
  const shown = (problem: string) => (tried ? problem : "");

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 md:p-6">
        <h2 className="text-lg font-semibold">{heading}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Company"
            value={values.company}
            maxLength={JOB_LIMITS.company}
            counter={count("company")}
            error={shown(problems.company)}
            onChange={(event) => change("company", event.target.value)}
          />
          <Input
            label="Job title"
            value={values.title}
            maxLength={JOB_LIMITS.title}
            counter={count("title")}
            error={shown(problems.title)}
            onChange={(event) => change("title", event.target.value)}
          />
          <Input
            label="Source (optional)"
            value={values.source}
            maxLength={JOB_LIMITS.source}
            counter={count("source")}
            placeholder="Naukri, LinkedIn…"
            onChange={(event) => change("source", event.target.value)}
          />
          <Input
            label="Location (optional)"
            value={values.location}
            maxLength={JOB_LIMITS.location}
            counter={count("location")}
            onChange={(event) => change("location", event.target.value)}
          />
          <Input
            label="Salary range (optional)"
            value={values.salaryRange}
            maxLength={JOB_LIMITS.salaryRange}
            counter={count("salaryRange")}
            placeholder="12-18 LPA"
            onChange={(event) => change("salaryRange", event.target.value)}
          />
          <Input
            label="Link (optional)"
            value={values.link}
            maxLength={JOB_LIMITS.link}
            counter={count("link")}
            inputMode="url"
            error={shown(problems.link)}
            onChange={(event) => change("link", event.target.value)}
          />
        </div>

        <Textarea
          label="Job description"
          value={values.description}
          placeholder="Paste the full job description here"
          counter={`${values.description.length.toLocaleString()} / ${JOB_LIMITS.description.toLocaleString()}`}
          error={shown(problems.description)}
          // field-sizing-content: the box grows with the text, between these two heights
          className="field-sizing-content max-h-96 min-h-48"
          onChange={(event) => change("description", event.target.value)}
        />

        <Input
          label="Note (optional)"
          value={values.note}
          maxLength={JOB_LIMITS.note}
          counter={count("note")}
          placeholder="For example: a referral from a friend"
          onChange={(event) => change("note", event.target.value)}
        />

        {error && (
          <p role="alert" className="text-sm text-bad">
            {error}
          </p>
        )}
      </div>

      {/* the buttons stay visible at the bottom; on a phone the bar reaches the screen edges */}
      <div className="sticky bottom-0 z-10 mt-auto flex justify-end gap-2 border-t border-line bg-canvas py-3 max-md:-bottom-4 max-md:-mx-4 max-md:-mb-4 max-md:bg-panel max-md:px-4">
        {/* on a phone the two buttons share the width equally */}
        <Button variant="secondary" className="max-md:flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="max-md:flex-1" loading={saving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
