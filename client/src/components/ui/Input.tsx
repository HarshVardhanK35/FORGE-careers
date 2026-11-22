import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  // a red border without a message, when the message is shown somewhere else
  invalid?: boolean;
  // the width of the box, for example "w-28"; the label row above it stays full width
  boxWidth?: string;
  // a small text on the far right of the label row, for example a character count like "12/30"
  counter?: string;
  // something shown inside the field on the right, for example the show-password button
  rightSlot?: ReactNode;
}

export default function Input({ label, error, hint, invalid, boxWidth = "w-full", counter, rightSlot, className = "", ...rest }: InputProps) {
  const id = useId();
  const messageId = `${id}-message`;

  return (
    <div className="flex flex-col gap-1.5">
      {/* a narrow box (boxWidth) has its limit right beside the label; a full-width one has it at the far right */}
      <div className={`flex items-baseline gap-3 ${boxWidth === "w-full" ? "justify-between" : ""}`}>
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {counter && <span className="text-xs text-muted">{counter}</span>}
      </div>

      <div className={`relative ${boxWidth}`}>
        <input
          id={id}
          aria-invalid={error || invalid ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={
            "w-full rounded-lg border bg-canvas px-3 py-2 text-sm text-fg placeholder:text-muted " +
            "focus:border-accent focus:outline-none " +
            (error || invalid ? "border-bad" : "border-line") +
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
