import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Lock } from "lucide-react";

import LevelCard from "./LevelCard";
import TopicRow from "./TopicRow";
import Button from "../ui/Button";
import type { RoadmapSkill, RoadmapTopic } from "../../lib/types";

// the topics of one category, in order (the topic list is already in learning order)
interface TopicGroup {
  name: string;
  topics: { topic: RoadmapTopic; number: number }[];
}

// 3 becomes 03 so a count has two digits, but 0 stays 0
const two = (n: number) => (n === 0 ? "0" : String(n).padStart(2, "0"));

function groupByCategory(topics: RoadmapTopic[]): TopicGroup[] {
  const groups: TopicGroup[] = [];
  topics.forEach((topic, index) => {
    const last = groups[groups.length - 1];
    if (last && last.name === topic.category) last.topics.push({ topic, number: index + 1 });
    else groups.push({ name: topic.category, topics: [{ topic, number: index + 1 }] });
  });
  return groups;
}

interface SkillPanelProps {
  skill: RoadmapSkill;
  previousName: string; // the skill before it (named in the lock banner)
  now: number;
  onUnlock: () => void;
  onTick: (topicId: string, done: boolean) => void;
  onSaveResource: (topicId: string, text: string) => Promise<void>;
}

// What opens under a skill row: the lock banner, the topics grouped by category, and the three level cards.
export default function SkillPanel({ skill, previousName, now, onUnlock, onTick, onSaveResource }: SkillPanelProps) {
  // an accordion: one category is open at a time; at first the first category that is not finished
  // (it is chosen once, so ticking the last topic of a category does not move the page under his finger)
  const groups = groupByCategory(skill.topics);
  const [openName, setOpenName] = useState<string | null>(
    () => (groups.find((group) => group.topics.some(({ topic }) => !topic.done)) ?? groups[0])?.name ?? null
  );

  const allTicked = skill.topicsTotal > 0 && skill.topicsDone === skill.topicsTotal;
  const testsNote =
    allTicked || !skill.unlocked
      ? "Levels open in order. Passing one opens the next at once."
      : "Tick every topic to open the tests.";

  return (
    <div className="flex flex-col gap-6 border-t border-line bg-canvas px-3 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
      {!skill.unlocked && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3">
          <Lock size={20} className="text-muted" aria-hidden="true" />
          <p className="min-w-[220px] flex-1 text-sm">Topics unlock when every level of {previousName} is passed.</p>
          <Button variant="secondary" onClick={onUnlock}>
            Unlock anyway
          </Button>
        </div>
      )}

      <section aria-label="Topics" className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-base font-semibold">Topics</h3>
          <small className="text-xs text-muted">basic to hard</small>
          <span className="ml-auto text-xs text-muted">
            {skill.topicsDone} of {skill.topicsTotal} ticked
          </span>
        </div>

        {skill.topics.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line px-4 py-5 text-sm text-muted">
            Topics coming soon.
          </p>
        ) : (
          <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
            {groups.map((group) => {
              const done = group.topics.filter(({ topic }) => topic.done).length;
              const open = openName === group.name;
              return (
                <div key={group.name}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenName(open ? null : group.name)}
                    className="flex w-full items-center gap-2 bg-canvas/40 px-4 py-2.5 text-left hover:bg-muted/5 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span className="flex-1 text-xs font-semibold uppercase tracking-wide text-muted">{group.name}</span>
                    {done === group.topics.length && <CheckCircle2 size={14} className="text-ok" aria-hidden="true" />}
                    <span className="text-xs text-muted">
                      {two(done)} of {two(group.topics.length)}
                    </span>
                    {open ? (
                      <ChevronUp size={16} className="text-muted" aria-hidden="true" />
                    ) : (
                      <ChevronDown size={16} className="text-muted" aria-hidden="true" />
                    )}
                  </button>

                  {open && (
                    <ol className="divide-y divide-line border-t border-line">
                      {group.topics.map(({ topic, number }) => (
                        <TopicRow
                          key={topic.id}
                          number={number}
                          topic={topic}
                          locked={!skill.unlocked}
                          onTick={(isDone) => onTick(topic.id, isDone)}
                          onSaveResource={(text) => onSaveResource(topic.id, text)}
                        />
                      ))}
                    </ol>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section aria-label="Tests" className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-base font-semibold">Tests</h3>
          <small className="text-xs text-muted">{testsNote}</small>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(236px,1fr))] gap-3">
          {skill.levels.map((level) => (
            <LevelCard key={level.level} skillId={skill.id} level={level} now={now} />
          ))}
        </div>
      </section>
    </div>
  );
}
