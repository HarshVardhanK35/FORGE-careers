import { Route, Routes } from "react-router-dom";

import { RedirectIfSignedIn, RequireAuth, RequireOnboarding } from "./components/auth/RouteGuards";
import AppShell from "./components/layout/AppShell";
import { usePageTitle } from "./context/PageHeaderContext";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import ResumePage from "./pages/ResumePage";
import ResumesPage from "./pages/ResumesPage";
import SignupPage from "./pages/SignupPage";

// a temporary page; each one is replaced by the real page in a later batch
function Placeholder({ title }: { title: string }) {
  usePageTitle(title); // the title appears in the header
  return <p className="text-sm text-muted">The {title} page is built in a later batch.</p>;
}

export default function App() {
  return (
    <Routes>
      {/* sign-in and sign-up: for signed-out visitors only */}
      <Route element={<RedirectIfSignedIn />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      {/* everything else needs a signed-in user */}
      <Route element={<RequireAuth />}>
        {/* onboarding: a full-screen flow, outside the app shell */}
        <Route path="onboarding" element={<OnboardingPage />} />

        {/* the app itself: only after onboarding is complete */}
        <Route element={<RequireOnboarding />}>
          <Route element={<AppShell />}>
            <Route index element={<Placeholder title="Home" />} />
            <Route path="jobs" element={<Placeholder title="Jobs" />} />
            <Route path="resumes" element={<ResumesPage />} />
            <Route path="resumes/:id" element={<ResumePage />} />
            <Route path="tracker" element={<Placeholder title="Tracker" />} />
            <Route path="skills" element={<Placeholder title="Skills" />} />
            <Route path="profile" element={<Placeholder title="Profile" />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
