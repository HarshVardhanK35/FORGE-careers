import { useEffect, useRef } from "react";

interface FitTitleProps {
  text: string;
  className?: string;
  maxSize?: number; // the normal font size in pixels
  minSize?: number; // the smallest size; below it the text ends with "..."
}

// A heading that shrinks its font size when the text does not fit its box.
// It measures the box: while the text is wider than the room, the size goes down by half a pixel,
// until the text fits or the smallest size is reached.
export default function FitTitle({ text, className = "", maxSize = 18, minSize = 12 }: FitTitleProps) {
  // useRef: a handle on the heading, to measure it (scrollWidth = the text width, clientWidth = the room)
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function fit() {
      if (!element) return;
      let size = maxSize;
      element.style.fontSize = `${size}px`;
      while (element.scrollWidth > element.clientWidth && size > minSize) {
        size -= 0.5;
        element.style.fontSize = `${size}px`;
      }
    }

    fit();
    // the room changes when the window is resized or the buttons beside the title change
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    // the text is measured again once the font has loaded
    document.fonts?.ready.then(fit);

    return () => observer.disconnect();
  }, [text, maxSize, minSize]);

  return (
    <h1 ref={ref} className={`truncate ${className}`}>
      {text}
    </h1>
  );
}
