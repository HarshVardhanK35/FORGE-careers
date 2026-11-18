import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { api, refreshSession, setSessionHandlers } from "../lib/api";

export interface User {
  id: string;
  email: string;
}

type Status = "loading" | "signedOut" | "signedIn";

// everything the rest of the app can read or call about the signed-in user
interface AuthValue {
  status: Status;
  user: User | null;
  // when the access token ends (milliseconds since 1970); the session warning uses it
  expiresAt: number | null;
  // true after a session ended on its own, so the sign-in page can say so
  sessionEnded: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, setupSecret: string) => Promise<void>;
  logout: (options?: { sessionEnded?: boolean }) => Promise<void>;
  staySignedIn: () => Promise<boolean>;
}

// Context: a way to share values with every component below the provider,
// without passing them down as props one level at a time
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // useState: remembers a value, and draws the screen again when it changes
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);

  // The session is "watched" only while somebody is signed in.
  // The API client calls these two functions when a refresh worked or failed.
  function watchSession() {
    setSessionHandlers({
      onRefreshed: (accessExpiresAt) => setExpiresAt(accessExpiresAt),
      onExpired: () => {
        setSessionHandlers(null);
        setUser(null);
        setExpiresAt(null);
        setSessionEnded(true);
        setStatus("signedOut");
        queryClient.clear();
      },
    });
  }

  // useEffect with [] runs once, when the page first opens: get a fresh access token
  // (which also tells us when it ends), then load the user.
  // No valid refresh token means nobody is signed in.
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      const accessExpiresAt = await refreshSession();
      if (cancelled) return;

      if (accessExpiresAt === null) {
        setStatus("signedOut");
        return;
      }

      try {
        const me = await api.get<User>("/auth/me");
        if (cancelled) return;
        setUser(me);
        setExpiresAt(accessExpiresAt);
        watchSession();
        setStatus("signedIn");
      } catch {
        if (!cancelled) setStatus("signedOut");
      }
    }

    restore();

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email: string, password: string) {
    const result = await api.post<{ accessExpiresAt: number }>("/auth/login", { email, password });
    const me = await api.get<User>("/auth/me");
    setUser(me);
    setExpiresAt(result.accessExpiresAt);
    setSessionEnded(false);
    watchSession();
    setStatus("signedIn");
  }

  // the server's sign-up does not sign in, so we sign in right after it
  async function signup(email: string, password: string, setupSecret: string) {
    await api.post("/auth/signup", { email, password, setupSecret });
    await login(email, password);
  }

  async function logout(options?: { sessionEnded?: boolean }) {
    setSessionHandlers(null);
    try {
      await api.post("/auth/logout");
    } catch {
      // the session may already be gone on the server; we sign out here anyway
    }
    setUser(null);
    setExpiresAt(null);
    setSessionEnded(options?.sessionEnded ?? false);
    setStatus("signedOut");
    queryClient.clear(); // drop every cached answer of the signed-out user
  }

  // "Stay signed in" in the session warning: get a new access token
  async function staySignedIn(): Promise<boolean> {
    const accessExpiresAt = await refreshSession();
    return accessExpiresAt !== null;
  }

  const value: AuthValue = { status, user, expiresAt, sessionEnded, login, signup, logout, staySignedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useContext: reads the shared values; any component calls useAuth() to get them
export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return value;
}
