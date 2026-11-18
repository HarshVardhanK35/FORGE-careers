import type { ReactNode } from "react";

import Logo from "../layout/Logo";

interface AuthLayoutProps {
  title: string;
  // a message above the form, for example "Your session ended"
  notice?: string;
  // the line under the card, for example a link to the other page
  footer?: ReactNode;
  // a wider card, for screens with a long list
  wide?: boolean;
  children: ReactNode;
}

// the centred card shared by the sign-in and sign-up pages (no side bar, no header)
export default function AuthLayout({ title, notice, footer, wide = false, children }: AuthLayoutProps) {
  return (
    <div
      className={`flex min-h-full flex-col items-center justify-center p-4 ${
        wide ? "gap-4 md:gap-3 md:py-3" : "gap-6"
      }`}
    >
      <Logo />

      <div
        className={`w-full rounded-xl border border-line bg-panel ${
          wide ? "max-w-3xl p-4 md:p-5" : "max-w-sm p-6"
        }`}
      >
        <h1 className={`text-xl font-semibold ${wide ? "mb-2 md:mb-3" : "mb-4"}`}>{title}</h1>

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

      {footer && <p className="text-sm text-muted">{footer}</p>}
    </div>
  );
}
