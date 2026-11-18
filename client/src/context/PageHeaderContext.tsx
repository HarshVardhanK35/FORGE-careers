import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

// The header lives in the app shell, but every page decides what it shows:
// its title (usePageTitle) and its main button (HeaderAction).

interface PageHeaderValue {
  title: string;
  setTitle: (title: string) => void;
  // the empty box in the header where a page's main button appears
  actionSlot: HTMLElement | null;
  setActionSlot: (element: HTMLElement | null) => void;
}

const PageHeaderContext = createContext<PageHeaderValue | null>(null);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [actionSlot, setActionSlot] = useState<HTMLElement | null>(null);

  return (
    <PageHeaderContext.Provider value={{ title, setTitle, actionSlot, setActionSlot }}>
      {children}
    </PageHeaderContext.Provider>
  );
}

function usePageHeaderContext(): PageHeaderValue {
  const value = useContext(PageHeaderContext);
  if (!value) {
    throw new Error("The page header hooks must be used inside PageHeaderProvider");
  }
  return value;
}

// used by the shell to draw the header
export function usePageHeaderState() {
  const { title, setActionSlot } = usePageHeaderContext();
  return { title, setActionSlot };
}

// a page calls this with its title; it also sets the browser tab title
export function usePageTitle(title: string) {
  const { setTitle } = usePageHeaderContext();

  useEffect(() => {
    setTitle(title);
    document.title = `${title} · FORGE Careers`;
  }, [title, setTitle]);
}

// A page puts its main button between these tags, and the button appears in the header.
// createPortal draws the button inside the header's empty box instead of inside the page.
export function HeaderAction({ children }: { children: ReactNode }) {
  const { actionSlot } = usePageHeaderContext();
  return actionSlot ? createPortal(children, actionSlot) : null;
}
