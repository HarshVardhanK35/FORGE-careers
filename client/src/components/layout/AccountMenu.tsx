import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LogOut, User } from "lucide-react";

import Dropdown from "../ui/Dropdown";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import type { Profile } from "../../lib/types";

const ITEM_CLASS =
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-fg " +
  "hover:bg-line/40 focus-visible:bg-line/40 focus-visible:outline-none";

// A round button with the first letter of the name (the email until the profile is loaded). Its menu has Profile and Sign out.
export default function AccountMenu() {
  const { user, logout } = useAuth();
  const profile = useQuery({ queryKey: ["profile"], queryFn: () => api.get<Profile>("/profile") });
  const initial = (profile.data?.name.trim() || user?.email || "?").charAt(0).toUpperCase();

  return (
    <Dropdown
      align="right"
      panelClassName="w-56"
      renderTrigger={({ open, toggle }) => (
        <button
          type="button"
          aria-label="Account menu"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={toggle}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent hover:bg-accent/25 focus-visible:outline-2 focus-visible:outline-accent"
        >
          {initial}
        </button>
      )}
    >
      {(close) => (
        <div role="menu">
          <p className="truncate px-3 py-2 text-xs text-muted">{user?.email}</p>
          <div className="my-1 h-px bg-line" />

          <Link to="/profile" role="menuitem" onClick={close} className={ITEM_CLASS}>
            <User size={16} />
            Profile
          </Link>

          <button
            type="button"
            role="menuitem"
            data-leave-guard
            onClick={() => {
              close();
              logout();
            }}
            className={ITEM_CLASS}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </Dropdown>
  );
}
