import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "../ui/Input";
import type { InputProps } from "../ui/Input";

type PasswordInputProps = Omit<InputProps, "type" | "rightSlot">;

// an Input for passwords, with the eye button that shows or hides the text
export default function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="rounded p-1 text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
