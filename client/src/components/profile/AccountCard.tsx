import { useId } from "react";
import { LogOut } from "lucide-react";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

// The third card: the email (read only) and Sign out.
export default function AccountCard() {
  const { user, logout } = useAuth();
  const emailId = useId();

  return (
    <section aria-labelledby="title-account" className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-4 md:p-5">
      <h2 id="title-account" className="text-base font-semibold">
        Account
      </h2>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-55 flex-1 flex-col gap-1.5">
          <label htmlFor={emailId} className="text-sm font-medium">
            Email
          </label>
          <input
            id={emailId}
            readOnly
            value={user?.email ?? ""}
            className="w-full cursor-not-allowed rounded-lg border border-line bg-line/20 px-3 py-2 text-xs text-muted sm:text-sm"
          />
        </div>

        {/* data-leave-guard: the page asks "Leave without saving?" first when there are unsaved changes */}
        <Button variant="secondary" data-leave-guard onClick={() => logout()}>
          <LogOut size={16} aria-hidden="true" />
          Sign out
        </Button>
      </div>
    </section>
  );
}
