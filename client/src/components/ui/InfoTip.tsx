import { useEffect, useId, useState } from "react";
import type { MouseEvent } from "react";
import { Info } from "lucide-react";

const BUBBLE_WIDTH = 256;
const MARGIN = 8; // the least distance between the bubble and the edge of the screen

interface Position {
  left: number;
  width: number;
  // where the little arrow sits inside the bubble
  arrowLeft: number;
  // the bubble goes above the icon when there is no room below it
  above: boolean;
  top: number;
  bottom: number;
}

// A small (i) button. Clicking it shows a short bubble with an arrow pointing at the icon,
// like a tooltip. A click anywhere else, Escape, or scrolling closes it.
export default function InfoTip({ label, text }: { label: string; text: string }) {
  const id = useId();
  const [position, setPosition] = useState<Position | null>(null);

  // the bubble would no longer sit next to its icon after a scroll or a resize, so it closes
  useEffect(() => {
    if (!position) return;

    const close = () => setPosition(null);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);

    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [position]);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    if (position) {
      setPosition(null);
      return;
    }

    // measure where the icon is, then place the bubble next to it and keep it on the screen
    const rect = event.currentTarget.getBoundingClientRect();
    const width = Math.min(BUBBLE_WIDTH, window.innerWidth - MARGIN * 2);
    const center = rect.left + rect.width / 2;
    const left = Math.min(Math.max(center - width / 2, MARGIN), window.innerWidth - width - MARGIN);

    setPosition({
      left,
      width,
      arrowLeft: center - left,
      above: rect.bottom > window.innerHeight - 180,
      top: rect.bottom + 10,
      bottom: window.innerHeight - rect.top + 10,
    });
  }

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-expanded={position !== null}
        aria-controls={id}
        onClick={toggle}
        onKeyDown={(event) => {
          // Escape closes the bubble only, not a box around it
          if (event.key === "Escape" && position) {
            event.stopPropagation();
            setPosition(null);
          }
        }}
        className="shrink-0 rounded text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
      >
        <Info size={14} />
      </button>

      {position && (
        <>
          {/* an invisible layer: a click anywhere else closes the bubble */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setPosition(null)}
            className="fixed inset-0 z-[60] cursor-default"
          />

          <div
            id={id}
            role="tooltip"
            style={{
              left: position.left,
              width: position.width,
              ...(position.above ? { bottom: position.bottom } : { top: position.top }),
            }}
            className="fixed z-[61] rounded-lg bg-line px-3 py-2 text-xs leading-relaxed text-fg shadow-lg"
          >
            {text}
            {/* the arrow: a small square turned into a diamond, half hidden behind the bubble */}
            <span
              aria-hidden="true"
              style={{ left: position.arrowLeft - 5, ...(position.above ? { bottom: -5 } : { top: -5 }) }}
              className="absolute h-2.5 w-2.5 rotate-45 bg-line"
            />
          </div>
        </>
      )}
    </>
  );
}
