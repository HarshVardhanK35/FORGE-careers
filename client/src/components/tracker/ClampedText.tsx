import { useState } from "react";

// a text longer than this, or with more than 3 line breaks, gets a "Show more" button
// (140 characters are about 4 lines on the narrowest phone, so a shorter text always fits)
const LONG_TEXT = 140;
const SHOWN_LINES = 4;

interface ClampedTextProps {
  label: string; // for example "Notes"
  text: string;
  accent?: boolean; // a thin blue line on the left, to set a text apart (the feedback)
}

// A labelled text that shows at most 4 lines, with "Show more" when it is long.
// There is no measuring: the button depends on the length of the text only, so it is always the same.
export default function ClampedText({ label, text, accent = false }: ClampedTextProps) {
  const [expanded, setExpanded] = useState(false);
  const long = text.length > LONG_TEXT || text.split("\n").length > SHOWN_LINES - 1;

  return (
    <div className={`flex flex-col gap-1 ${accent ? "border-l-2 border-accent/60 pl-2 md:pl-3" : ""}`}>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</h4>
      <p
        className={`whitespace-pre-line break-words text-sm text-fg/90 ${
          expanded || !long ? "" : "line-clamp-4"
        }`}
      >
        {text}
      </p>
      {long && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className="mt-1 w-fit text-xs text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
