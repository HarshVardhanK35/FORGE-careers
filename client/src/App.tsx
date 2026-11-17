import { Route, Routes } from "react-router-dom";

import AppShell from "./components/layout/AppShell";

// a temporary page; each one is replaced by the real page in a later batch
function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted">This page is built in a later batch.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Placeholder title="Home" />} />
        <Route path="jobs" element={<Placeholder title="Jobs" />} />
        <Route path="resumes" element={<Placeholder title="Resumes" />} />
        <Route path="tracker" element={<Placeholder title="Tracker" />} />
        <Route path="skills" element={<Placeholder title="Skills" />} />
        <Route path="profile" element={<Placeholder title="Profile" />} />
      </Route>
    </Routes>
  );
}
