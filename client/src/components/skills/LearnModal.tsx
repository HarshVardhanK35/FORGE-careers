import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { LoadingText } from "../ui/Spinner";
import { api } from "../../lib/api";
import type { TopicNotes } from "../../lib/types";

// a heading for a part of the notes
function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
      {children}
    </section>
  );
}

// code, in a box that scrolls sideways on a narrow screen
function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted">{label}</span>
      <pre className="overflow-x-auto rounded-lg border border-line bg-canvas p-3 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Notes({ notes }: { notes: TopicNotes }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed">{notes.summary}</p>

      {/* the explanation: short numbered points, in the order to learn them */}
      {notes.explanation.map((section) => (
        <Part key={section.heading} title={section.heading}>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed marker:text-muted">
            {section.points.map((point, index) => (
              <li key={index} className="pl-1">
                {point}
              </li>
            ))}
          </ol>
        </Part>
      ))}

      {notes.terms.length > 0 && (
        <Part title="Keywords">
          <dl className="flex flex-col gap-2 rounded-xl border border-line bg-canvas p-3 text-sm">
            {notes.terms.map((item) => (
              <div key={item.term}>
                <dt className="inline font-semibold">{item.term}</dt>
                <dd className="inline text-muted"> — {item.meaning}</dd>
              </div>
            ))}
          </dl>
        </Part>
      )}

      {notes.examples.map((example, index) => (
        <Part key={example.title} title={`Example ${index + 1}: ${example.title}`}>
          {example.environment === "browser" && example.html && (
            <CodeBlock label="The page this code runs on (HTML)" code={example.html} />
          )}
          <CodeBlock label={example.environment === "browser" ? "Code (runs in the browser)" : "Code (runs in Node)"} code={example.code} />

          <ol className="flex flex-col gap-1.5 text-sm leading-relaxed">
            {example.walkthrough.map((step, index) => (
              <li key={index} className="rounded-lg bg-panel px-3 py-1.5">
                {step}
              </li>
            ))}
          </ol>

          <CodeBlock label="Output" code={example.output} />
        </Part>
      ))}

      <Part title="Remember">
        <ul className="flex flex-col gap-2 text-sm">
          {notes.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </Part>

      {notes.commonMistakes.length > 0 && (
        <Part title="Common mistakes">
          <ul className="flex flex-col gap-2 text-sm">
            {notes.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-warn" aria-hidden="true" />
                {mistake}
              </li>
            ))}
          </ul>
        </Part>
      )}

      {notes.links.length > 0 && (
        <Part title="Read more">
          <ul className="flex flex-col gap-2 text-sm">
            {notes.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
                >
                  {link.title}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <p className="text-xs text-muted">{link.why}</p>
              </li>
            ))}
          </ul>
        </Part>
      )}
    </div>
  );
}

// The Learn window of one topic: loads its notes and shows them.
export default function LearnModal({ topicId, title, onClose }: { topicId: string; title: string; onClose: () => void }) {
  const notes = useQuery({
    queryKey: ["roadmap", "learn", topicId],
    queryFn: () => api.get<TopicNotes>(`/roadmap/topics/${topicId}/learn`),
  });

  return (
    <Modal title={title} onClose={onClose} wide>
      {notes.isPending && <LoadingText>Loading the notes…</LoadingText>}

      {notes.isError && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-bad">The notes could not be loaded.</p>
          <Button variant="secondary" size="sm" onClick={() => notes.refetch()}>
            Try again
          </Button>
        </div>
      )}

      {notes.data && <Notes notes={notes.data} />}
    </Modal>
  );
}
