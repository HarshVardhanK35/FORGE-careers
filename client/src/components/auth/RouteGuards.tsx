import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function FullScreenLoader() {
  return (
    <div role="status" aria-label="Loading" className="flex h-full items-center justify-center text-muted">
      <LoaderCircle size={24} className="animate-spin" />
    </div>
  );
}

// pages inside this guard need a signed-in user; everybody else goes to the sign-in page
export function RequireAuth() {
  const { status } = useAuth();

  if (status === "loading") return <FullScreenLoader />;
  if (status === "signedOut") return <Navigate to="/login" replace />;
  return <Outlet />;
}

// the sign-in and sign-up pages: a user who is already signed in goes to Home instead
export function RedirectIfSignedIn() {
  const { status } = useAuth();

  if (status === "loading") return <FullScreenLoader />;
  if (status === "signedIn") return <Navigate to="/" replace />;
  return <Outlet />;
}
