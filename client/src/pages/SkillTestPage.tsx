import { Link, useParams } from "react-router-dom";

// A placeholder: "Take test" and "Practice sets and answers" open this page in a new tab.
// The real test screen (the questions) is designed and built next.
export default function SkillTestPage() {
  const { skillId } = useParams();

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col items-start justify-center gap-3 p-6">
      <h1 className="text-lg font-semibold">The test screen is built next</h1>
      <p className="text-sm text-muted">
        The questions for <span className="text-fg">{skillId}</span> will open here, in their own tab.
      </p>
      <Link to="/skills" className="text-sm font-medium text-accent hover:underline">
        Back to Skills
      </Link>
    </div>
  );
}
