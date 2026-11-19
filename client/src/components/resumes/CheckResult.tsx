import type { ReactNode } from "react";

import type { ResumeCheck, Severity } from "../../lib/types";

const SEVERITY_ORDER: Severity[] = ["high", "medium", "low"];

const SEVERITY_BADGE: Record<Severity, string> = {
  high: "bg-bad/15 text-bad",
  medium: "bg-warn/15 text-warn",
  low: "bg-line text-muted",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
      {children}
    </section>
  );
}

// The result of one AI check: summary, strengths, things to fix (worst first) and missing keywords.
export default function CheckResult({ check }: { check: ResumeCheck }) {
  const issues = [...check.issues].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity),
  );

  return (
    <div className="flex flex-col gap-6">
      <Section title="Summary">
        <p className="text-sm">{check.summary}</p>
      </Section>

      {check.strengths.length > 0 && (
        <Section title="Strengths">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {check.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </Section>
      )}

      {issues.length > 0 && (
        <Section title="Things to fix">
          <ul className="flex flex-col gap-3">
            {issues.map((issue, index) => (
              <li key={index} className="rounded-xl border border-line bg-panel p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${SEVERITY_BADGE[issue.severity]}`}>
                    {issue.severity}
                  </span>
                  <span className="text-sm font-medium">{issue.section}</span>
                </div>
                <p className="text-sm">{issue.problem}</p>
                <p className="mt-2 text-sm text-muted">
                  <span className="font-medium text-fg">Suggestion: </span>
                  {issue.suggestion}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {check.keywordGaps.length > 0 && (
        <Section title={`Keywords missing for "${check.targetRole}"`}>
          <ul className="flex flex-wrap gap-2">
            {check.keywordGaps.map((keyword) => (
              <li key={keyword} className="rounded-full border border-line px-3 py-1 text-xs">
                {keyword}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
