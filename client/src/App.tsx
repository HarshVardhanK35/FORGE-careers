import { Route, Routes } from "react-router-dom";

import { RedirectIfSignedIn, RequireAuth, RequireOnboarding } from "./components/auth/RouteGuards";
import AppShell from "./components/layout/AppShell";
import ApplicationPage from "./pages/ApplicationPage";
import HomePage from "./pages/HomePage";
import JobFormPage from "./pages/JobFormPage";
import JobPage from "./pages/JobPage";
import JobsPage, { JobsIndex } from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage";
import ResumePage from "./pages/ResumePage";
import ResumesPage, { ResumesIndex } from "./pages/ResumesPage";
import SignupPage from "./pages/SignupPage";
import SkillPracticePage from "./pages/SkillPracticePage";
import SkillsPage from "./pages/SkillsPage";
import SkillTestPage from "./pages/SkillTestPage";
import TrackerPage, { TrackerIndex } from "./pages/TrackerPage";

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

        {/* the test and the practice sets open in their own browser tab, outside the app shell */}
        <Route path="skills/:skillId/test" element={<SkillTestPage />} />
        <Route path="skills/:skillId/practice" element={<SkillPracticePage />} />

        {/* the app itself: only after onboarding is complete */}
        <Route element={<RequireOnboarding />}>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            {/* Jobs and Resumes are split pages: the list is the parent, the chosen item is the child */}
            <Route path="jobs" element={<JobsPage />}>
              <Route index element={<JobsIndex />} />
              <Route path="new" element={<JobFormPage />} />
              <Route path=":id" element={<JobPage />} />
              <Route path=":id/edit" element={<JobFormPage />} />
            </Route>
            <Route path="resumes" element={<ResumesPage />}>
              <Route index element={<ResumesIndex />} />
              <Route path=":id" element={<ResumePage />} />
            </Route>
            <Route path="tracker" element={<TrackerPage />}>
              <Route index element={<TrackerIndex />} />
              <Route path=":id" element={<ApplicationPage />} />
            </Route>
            <Route path="skills" element={<SkillsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
