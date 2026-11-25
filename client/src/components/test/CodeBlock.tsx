// A code box with line numbers that scrolls sideways on a narrow screen.
export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  const lines = code.split("\n");

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-xs text-muted">{label}</span>}
      <div role="region" aria-label={label ?? "Code"} className="overflow-x-auto rounded-xl border border-line bg-panel py-4">
        <pre className="w-max min-w-full font-mono text-xs leading-5 md:text-sm md:leading-[22px]">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex pr-4">
                <span aria-hidden="true" className="w-7 shrink-0 select-none pr-4 text-right text-muted">
                  {index + 1}
                </span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
