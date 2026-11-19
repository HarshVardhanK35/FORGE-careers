interface FitTitleProps {
  text: string;
  className?: string;
  maxSize?: number; // the normal font size in pixels
  minSize?: number; // the smallest size; below it the text ends with "..."
}

// An average letter of a bold sans-serif font is about 0.58 of the font size wide.
// 0.6 keeps a little room to spare.
const CHAR_WIDTH = 0.6;

// A heading that shrinks its font size when the text is too long for its box.
// The size is calculated by the browser from the room and the number of characters:
//   size = room / (characters x 0.6), never above maxSize and never below minSize.
// "container-type: inline-size" makes the wrapper a container, and 100cqw is 100% of its width,
// so the size follows the room at every screen width with no script to run or wait for.
// If the text still does not fit at minSize, it ends with "...".
export default function FitTitle({ text, className = "", maxSize = 18, minSize = 12 }: FitTitleProps) {
  const characters = Math.max(text.length, 1);
  const fontSize = `clamp(${minSize}px, calc(100cqw / ${characters * CHAR_WIDTH}), ${maxSize}px)`;

  return (
    <div className={className} style={{ containerType: "inline-size" }}>
      <h1 className="truncate leading-6" style={{ fontSize }}>
        {text}
      </h1>
    </div>
  );
}
