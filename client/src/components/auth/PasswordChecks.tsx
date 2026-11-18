import { Check } from "lucide-react";

import { passwordRules } from "../../lib/validation";

// a row of small checks under the password field: each turns green when its rule is met
export default function PasswordChecks({ password }: { password: string }) {
  const rules = passwordRules(password);

  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Password rules">
      {rules.map((rule) => (
        <li
          key={rule.label}
          className={`flex items-center gap-1.5 text-xs ${rule.met ? "text-ok" : "text-muted"}`}
        >
          <Check size={14} aria-hidden="true" />
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
