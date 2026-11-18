import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface DropdownProps {
  // draws the button that opens the panel
  renderTrigger: (state: { open: boolean; toggle: () => void }) => ReactNode;
  // draws what is inside the panel; "close" closes it (for example after an item is chosen)
  children: (close: () => void) => ReactNode;
  // which edge of the button the panel lines up with
  align?: "left" | "right";
  // the panel is as wide as the button (for a select menu); otherwise it uses panelClassName
  matchWidth?: boolean;
  // the size of the panel when matchWidth is off, for example "w-56"
  panelClassName?: string;
}

// where the panel is drawn on the screen
interface PanelPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  width?: number;
}

const PANEL_SPACE = 280; // the room the panel needs, so it can open upwards when there is none below

// The panel that opens under a button: the account menu and the select menus use it.
// The panel is placed by its position on the screen (fixed), so a box with its own scrolling
// around the button (a modal) cannot cut it off. A click elsewhere, Escape or a scroll closes it.
export default function Dropdown({
  renderTrigger,
  children,
  align = "right",
  matchWidth = false,
  panelClassName = "w-56",
}: DropdownProps) {
  // useRef: a handle on a page element, to measure it or check where a click happened
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<PanelPosition | null>(null);
  const open = position !== null;
  const close = () => setPosition(null);

  // the panel would no longer sit under its button after a scroll or a resize, so it closes
  useEffect(() => {
    if (!open) return;

    function closeOnScroll(event: Event) {
      // scrolling the panel's own list must not close it
      if (panelRef.current && event.target instanceof Node && panelRef.current.contains(event.target)) return;
      setPosition(null);
    }
    const closeOnResize = () => setPosition(null);

    window.addEventListener("scroll", closeOnScroll, true);
    window.addEventListener("resize", closeOnResize);
    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open]);

  function toggle() {
    if (open) {
      close();
      return;
    }

    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    const roomBelow = window.innerHeight - rect.bottom;
    const roomAbove = rect.top;
    const above = roomBelow < PANEL_SPACE && roomAbove > roomBelow;

    setPosition({
      ...(above ? { bottom: window.innerHeight - rect.top + 8 } : { top: rect.bottom + 8 }),
      ...(align === "right" ? { right: window.innerWidth - rect.right } : { left: rect.left }),
      ...(matchWidth ? { width: rect.width } : {}),
    });
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onKeyDown={(event) => {
        // Escape closes only the panel, not a box (a modal) around it
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          close();
        }
      }}
    >
      {renderTrigger({ open, toggle })}

      {position && (
        <>
          {/* an invisible layer over the page: a click anywhere outside the panel closes it */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={close}
            className="fixed inset-0 z-10 cursor-default"
          />

          <div
            ref={panelRef}
            style={position}
            className={`fixed z-20 max-h-72 overflow-y-auto rounded-lg border border-line bg-panel p-1 shadow-lg ${
              matchWidth ? "" : panelClassName
            }`}
          >
            {children(close)}
          </div>
        </>
      )}
    </div>
  );
}
