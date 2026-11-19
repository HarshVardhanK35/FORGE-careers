import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  // a small text on the far right of the label row, for example a character count
  counter?: string;
}

// A multi-line text box with a label, in the same style as Input.
export default function Textarea({ label, error, hint, counter, className = "", ...rest }: TextareaProps) {
  const id = useId();
  const messageId = `${id}-message`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {counter && <span className={`text-xs ${error ? "text-bad" : "text-muted"}`}>{counter}</span>}
      </div>

      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={
          "w-full rounded-lg border bg-canvas px-3 py-2 text-sm text-fg placeholder:text-muted " +
          "focus:border-accent focus:outline-none " +
          (error ? "border-bad" : "border-line") +
          ` ${className}`
        }
        {...rest}
      />

      {(error || hint) && (
        <p id={messageId} className={`text-xs ${error ? "text-bad" : "text-muted"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
