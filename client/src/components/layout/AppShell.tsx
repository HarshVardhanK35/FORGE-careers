import { NavLink, Outlet } from "react-router-dom";
import { Briefcase, FileText, LayoutDashboard, ListChecks, Target, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageHeaderProvider, usePageHeaderState } from "../../context/PageHeaderContext";
import AccountMenu from "./AccountMenu";
import AppliedTodayChip from "./AppliedTodayChip";
import Logo from "./Logo";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

// the five main pages: the side bar on a desktop and the bottom tabs on a phone
const MAIN_ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/resumes", label: "Resumes", icon: FileText },
  { to: "/tracker", label: "Tracker", icon: ListChecks },
  { to: "/skills", label: "Skills", icon: Target },
];

function sideClass({ isActive }: { isActive: boolean }) {
  const base = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium";
  return isActive
    ? `${base} bg-accent/15 text-accent`
    : `${base} text-muted hover:bg-line/40 hover:text-fg`;
}

function tabClass({ isActive }: { isActive: boolean }) {
  const base = "flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium";
  return isActive ? `${base} text-accent` : `${base} text-muted`;
}

function Shell() {
  const { title, setActionSlot } = usePageHeaderState();

  return (
    <div className="flex h-full">
      {/* desktop: the side bar */}
      <aside className="hidden w-56 flex-col border-r border-line bg-panel p-4 md:flex">
        <div className="px-3 pb-6 pt-2">
          <Logo />
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {MAIN_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={sideClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/profile" className={sideClass}>
          <User size={18} />
          Profile
        </NavLink>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* the header, on a desktop and on a phone: the page title, then the chip,
            the page's main button and the account menu */}
        <header className="flex items-center gap-3 border-b border-line bg-panel px-4 py-3 md:px-8">
          <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
          <AppliedTodayChip />
          {/* an empty box: a page fills it with <HeaderAction> */}
          <div ref={setActionSlot} className="flex items-center gap-2" />
          <AccountMenu />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>

        {/* phone: the bottom tabs */}
        <nav className="flex border-t border-line bg-panel md:hidden">
          {MAIN_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={tabClass}>
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function AppShell() {
  return (
    <PageHeaderProvider>
      <Shell />
    </PageHeaderProvider>
  );
}
