import { Route, Routes } from "react-router-dom";

import { RedirectIfSignedIn, RequireAuth, RequireOnboarding } from "./components/auth/RouteGuards";
import AppShell from "./components/layout/AppShell";
import NothingSelected from "./components/layout/NothingSelected";
import { usePageTitle } from "./context/PageHeaderContext";
import JobFormPage from "./pages/JobFormPage";
import JobPage from "./pages/JobPage";
import JobsPage from "./pages/JobsPage";
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
            {/* Jobs and Resumes are split pages: the list is the parent, the chosen item is the child */}
            <Route path="jobs" element={<JobsPage />}>
              <Route index element={<NothingSelected title="Jobs" message="Select a job to see its details and match." />} />
              <Route path="new" element={<JobFormPage />} />
              <Route path=":id" element={<JobPage />} />
              <Route path=":id/edit" element={<JobFormPage />} />
            </Route>
            <Route path="resumes" element={<ResumesPage />}>
              <Route index element={<NothingSelected title="Resumes" message="Select a version to see its checks." />} />
              <Route path=":id" element={<ResumePage />} />
            </Route>
            <Route path="tracker" element={<Placeholder title="Tracker" />} />
            <Route path="skills" element={<Placeholder title="Skills" />} />
            <Route path="profile" element={<Placeholder title="Profile" />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
