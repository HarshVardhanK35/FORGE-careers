import { useState } from "react";
import { BookOpen, Check, Link as LinkIcon, Pencil, Plus, StickyNote } from "lucide-react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import LearnModal from "./LearnModal";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { errorMessage } from "../../lib/api";
import type { RoadmapTopic } from "../../lib/types";

const RESOURCE_MAX = 300;

interface TopicRowProps {
  number: number;
  topic: RoadmapTopic;
  locked: boolean; // the skill is locked: no tick and no resource
  onTick: (done: boolean) => void;
  onSaveResource: (text: string) => Promise<void>;
}

const isLink = (text: string) => /^https?:\/\//.test(text);

// One topic: a tick, its title, and a field for the resource he finds himself (a link or a short note).
export default function TopicRow({ number, topic, locked, onTick, onSaveResource }: TopicRowProps) {
  const desktop = useIsDesktop();
  const [learning, setLearning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function startEdit() {
    setValue(topic.resource);
    setError("");
    setEditing(true);
  }

  async function save() {
    if (value.length > RESOURCE_MAX) {
      setError(`Keep it under ${RESOURCE_MAX} characters.`);
      return;
    }
    setSaving(true);
    try {
      await onSaveResource(value);
      setEditing(false);
    } catch (problem) {
      setError(errorMessage(problem));
    } finally {
      setSaving(false);
    }
  }

  return (
    <li className="flex flex-wrap items-start gap-x-2 gap-y-1 py-2 pl-1.5 pr-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={topic.done}
        aria-label={`${topic.title}, ${topic.done ? "complete" : "not complete"}`}
        disabled={locked}
        onClick={() => onTick(!topic.done)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed"
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] ${
            topic.done ? "border-ok bg-ok text-canvas" : locked ? "border-line" : "border-muted"
          }`}
        >
          {topic.done && <Check size={13} strokeWidth={3} aria-hidden="true" />}
        </span>
      </button>

      {/* the title sits beside the tick; on a phone the notes go on their own line below, from the left edge */}
      <div className={`flex min-h-8 min-w-0 flex-1 items-center gap-2 text-sm md:flex-[1_1_200px] ${locked ? "text-muted" : ""}`}>
        <span className="min-w-[18px] text-muted tabular-nums">{number}</span>
        <span>{topic.title}</span>
        {topic.hasNotes && (
          <button
            type="button"
            onClick={() => setLearning(true)}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-accent hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <BookOpen size={14} aria-hidden="true" />
            Learn
          </button>
        )}
      </div>

      <div className="min-w-0 basis-full md:flex-[1_1_260px] md:basis-0">
        {editing ? (
          <div
            className="flex flex-col gap-2 py-1"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.stopPropagation();
                setEditing(false);
              }
            }}
          >
            <Input
              label="Notes"
              autoFocus
              counter={`${value.length} / ${RESOURCE_MAX}`}
              placeholder={desktop ? "Paste a video or document link, or a short note" : "Paste a link or note"}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setError(event.target.value.length > RESOURCE_MAX ? `Keep it under ${RESOURCE_MAX} characters.` : "");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  save();
                }
              }}
              error={error}
            />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" loading={saving} onClick={save}>
                Save
              </Button>
            </div>
          </div>
        ) : topic.resource ? (
          <div className="flex h-8 min-w-0 items-center gap-1.5 pl-0.5">
            {isLink(topic.resource) ? (
              <LinkIcon size={14} className="shrink-0 text-muted" aria-hidden="true" />
            ) : (
              <StickyNote size={14} className="shrink-0 text-muted" aria-hidden="true" />
            )}
            {isLink(topic.resource) ? (
              <a
                href={topic.resource}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex-1 truncate text-xs text-accent hover:underline"
              >
                {topic.resource.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            ) : (
              <span className="min-w-0 flex-1 truncate text-xs">{topic.resource}</span>
            )}
            {!locked && (
              <button
                type="button"
                aria-label="Edit notes"
                onClick={startEdit}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-muted/15 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
              >
                <Pencil size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        ) : locked ? (
          <p className="flex h-8 items-center text-xs text-muted">No resource yet</p>
        ) : (
          <button
            type="button"
            aria-label={`Add notes for ${topic.title}`}
            onClick={startEdit}
            className="flex h-8 w-full items-center gap-1.5 rounded-lg border border-dashed border-line px-2.5 text-left text-xs text-muted hover:border-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Plus size={12} aria-hidden="true" />
            Add a link or note
          </button>
        )}
      </div>
      {learning && <LearnModal topicId={topic.id} title={topic.title} onClose={() => setLearning(false)} />}
    </li>
  );
}
