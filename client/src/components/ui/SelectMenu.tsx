import { useId } from "react";
import { Check, ChevronDown } from "lucide-react";

import Dropdown from "./Dropdown";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectMenuProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

// A dropdown for choosing one option, in the same style as the account menu.
export default function SelectMenu({ label, value, options, onChange }: SelectMenuProps) {
  const labelId = useId();
  const current = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      <span id={labelId} className="text-sm font-medium">
        {label}
      </span>

      <Dropdown
        align="left"
        matchWidth
        renderTrigger={({ open, toggle }) => (
          <button
            type="button"
            aria-labelledby={labelId}
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={toggle}
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-line bg-canvas px-3 py-2 text-left text-sm text-fg hover:border-muted focus:border-accent focus:outline-none"
          >
            <span className="truncate">{current?.label}</span>
            <ChevronDown size={16} className="shrink-0 text-muted" />
          </button>
        )}
      >
        {(close) => (
          <div role="listbox" aria-labelledby={labelId}>
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    close();
                  }}
                  className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm text-fg hover:bg-line/40 focus-visible:bg-line/40 focus-visible:outline-none"
                >
                  <span>{option.label}</span>
                  {selected && <Check size={14} className="shrink-0 text-accent" />}
                </button>
              );
            })}
          </div>
        )}
      </Dropdown>
    </div>
  );
}
