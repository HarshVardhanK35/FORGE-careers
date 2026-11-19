import type { UseQueryResult } from "@tanstack/react-query";

import { formatDateTime } from "../../lib/dates";
import type { ResumeCheck } from "../../lib/types";
import SelectMenu from "../ui/SelectMenu";
import { LoadingText } from "../ui/Spinner";
import CheckResult from "./CheckResult";

interface CheckPanelProps {
  checks: UseQueryResult<ResumeCheck[]>; // the loaded checks of one version, newest first
  running: boolean; // a new check is being made
  selectedId: string | null; // the check the user picked in the dropdown (null = the newest)
  onSelect: (id: string) => void;
}

const PRIVACY_NOTE = "Contact details are removed before the text is sent.";

// The AI check part of the version page: loading and empty states, the dropdown of older checks,
// and the result of the shown check.
export default function CheckPanel({ checks, running, selectedId, onSelect }: CheckPanelProps) {
  const checkList = checks.data ?? [];
  // the chosen check, or the newest one
  const shownCheck = checkList.find((check) => check._id === selectedId) ?? checkList[0];

  return (
    <section className="flex flex-col gap-4" aria-label="AI check">
      {running && <LoadingText>Checking… this takes a few seconds. {PRIVACY_NOTE}</LoadingText>}

      {checks.isPending && <LoadingText>Loading the checks…</LoadingText>}

      {checks.isError && <p className="text-sm text-bad">The checks could not be loaded.</p>}

      {checks.isSuccess && checkList.length === 0 && !running && (
        <div className="rounded-xl border border-dashed border-line px-6 py-8 text-center">
          <p className="text-sm text-muted">No check yet. Run one to get feedback on this version.</p>
          <p className="mt-1 text-xs text-muted">{PRIVACY_NOTE}</p>
        </div>
      )}

      {shownCheck && (
        <>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="text-sm text-muted">
              Check from {formatDateTime(shownCheck.createdAt)} · {shownCheck.model}
            </p>
            {checkList.length > 1 && (
              <div className="w-full sm:w-64">
                <SelectMenu
                  label="Older checks"
                  value={shownCheck._id}
                  options={checkList.map((check) => ({
                    value: check._id,
                    label: `${formatDateTime(check.createdAt)} · ${check.model}`,
                  }))}
                  onChange={onSelect}
                />
              </div>
            )}
          </div>

          <CheckResult check={shownCheck} />
        </>
      )}
    </section>
  );
}
