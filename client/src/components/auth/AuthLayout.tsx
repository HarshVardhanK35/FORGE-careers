import type { ReactNode } from "react";

import Logo from "../layout/Logo";

interface AuthLayoutProps {
  title: string;
  // a message above the form, for example "Your session ended"
  notice?: string;
  // the line under the card, for example a link to the other page
  footer: ReactNode;
  children: ReactNode;
}

// the centred card shared by the sign-in and sign-up pages (no side bar, no header)
export default function AuthLayout({ title, notice, footer, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 p-4">
      <Logo />

      <div className="w-full max-w-sm rounded-xl border border-line bg-panel p-6">
        <h1 className="mb-4 text-xl font-semibold">{title}</h1>

        {notice && (
          <p
            role="status"
            className="mb-4 rounded-lg border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-warn"
          >
            {notice}
          </p>
        )}

        {children}
      </div>

      <p className="text-sm text-muted">{footer}</p>
    </div>
  );
}
