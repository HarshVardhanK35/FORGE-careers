import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useOnboarding } from "../../hooks/useOnboarding";

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

// the pages of the app: until onboarding is complete, the user is sent to the onboarding page
export function RequireOnboarding() {
  const onboarding = useOnboarding();

  if (onboarding.isPending) return <FullScreenLoader />;

  if (onboarding.isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
        <p className="text-sm text-bad">Could not load your data. Check that the server is running.</p>
        <Button variant="secondary" onClick={() => onboarding.refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!onboarding.data.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return <Outlet />;
}

// the sign-in and sign-up pages: a user who is already signed in goes to Home instead
export function RedirectIfSignedIn() {
  const { status } = useAuth();

  if (status === "loading") return <FullScreenLoader />;
  if (status === "signedIn") return <Navigate to="/" replace />;
  return <Outlet />;
}
