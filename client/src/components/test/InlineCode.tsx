// Text where a word between backticks, like `detail`, is shown as small highlighted code.
// Used for the questions and the options: a name taken from the code snippet is easy to see.
export default function InlineCode({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code key={index} className="rounded bg-line/50 px-1 py-0.5 font-mono text-[0.9em]">
            {part}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
}
