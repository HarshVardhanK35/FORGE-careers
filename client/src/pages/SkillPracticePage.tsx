import { Link, useParams } from "react-router-dom";

// A placeholder: "Practice sets and answers" opens this page in a new tab.
// The practice sets (all the sets and answers of a passed level) are built later.
export default function SkillPracticePage() {
  const { skillId } = useParams();

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col items-start justify-center gap-3 p-6">
      <h1 className="text-lg font-semibold">The practice sets are built later</h1>
      <p className="text-sm text-muted">
        The sets and answers for <span className="text-fg">{skillId}</span> will open here, in their own tab.
      </p>
      <Link to="/skills" className="text-sm font-medium text-accent hover:underline">
        Back to Skills
      </Link>
    </div>
  );
}
