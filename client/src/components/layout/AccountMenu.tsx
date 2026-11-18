import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const ITEM_CLASS =
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-fg " +
  "hover:bg-line/40 focus-visible:bg-line/40 focus-visible:outline-none";

// A round button with the first letter of the email. Its menu has Profile and Sign out.
export default function AccountMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initial = user?.email.charAt(0).toUpperCase() ?? "?";

  return (
    // pressing Escape anywhere inside closes the menu
    <div
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent hover:bg-accent/25 focus-visible:outline-2 focus-visible:outline-accent"
      >
        {initial}
      </button>

      {open && (
        <>
          {/* an invisible layer over the page: a click anywhere outside the menu closes it */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />

          <div
            role="menu"
            className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-line bg-panel p-1 shadow-lg"
          >
            <p className="truncate px-3 py-2 text-xs text-muted">{user?.email}</p>
            <div className="my-1 h-px bg-line" />

            <Link to="/profile" role="menuitem" onClick={() => setOpen(false)} className={ITEM_CLASS}>
              <User size={16} />
              Profile
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className={ITEM_CLASS}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
