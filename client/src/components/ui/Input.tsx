import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  // a small text on the far right of the label row, for example a character count like "12/30"
  counter?: string;
  // something shown inside the field on the right, for example the show-password button
  rightSlot?: ReactNode;
}

export default function Input({ label, error, hint, counter, rightSlot, className = "", ...rest }: InputProps) {
  const id = useId();
  const messageId = `${id}-message`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {counter && <span className="text-xs text-muted">{counter}</span>}
      </div>

      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={
            "w-full rounded-lg border bg-canvas px-3 py-2 text-sm text-fg placeholder:text-muted " +
            "focus:border-accent focus:outline-none " +
            (error ? "border-bad" : "border-line") +
            (rightSlot ? " pr-10" : "") +
            ` ${className}`
          }
          {...rest}
        />
        {rightSlot && <div className="absolute inset-y-0 right-0 flex items-center pr-2">{rightSlot}</div>}
      </div>

      {(error || hint) && (
        <p id={messageId} className={`text-xs ${error ? "text-bad" : "text-muted"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
