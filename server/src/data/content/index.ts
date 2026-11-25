// All topic notes, found by topic id. A new skill's notes file is added to the list below.

import { HTML_CSS_NOTES } from "./htmlcss";
import { JAVASCRIPT_NOTES } from "./javascript";
import type { TopicNotes } from "./types";

const ALL_NOTES: TopicNotes[] = [...JAVASCRIPT_NOTES, ...HTML_CSS_NOTES];

const NOTES_BY_TOPIC = new Map<string, TopicNotes>(ALL_NOTES.map((notes) => [notes.topicId, notes]));

export function getNotes(topicId: string): TopicNotes | undefined {
  return NOTES_BY_TOPIC.get(topicId);
}

export function hasNotes(topicId: string): boolean {
  return NOTES_BY_TOPIC.has(topicId);
}

export function allNotes(): TopicNotes[] {
  return ALL_NOTES;
}
