// A titled row of small chips for a list of skills; nothing is shown for an empty list.
// The match result and the tracker's match card both use it.
export default function SkillChips({
  title,
  skills,
  tone,
}: {
  title: string;
  skills: string[];
  tone: "ok" | "bad" | "muted";
}) {
  if (skills.length === 0) return null;

  const toneClass = {
    ok: "border-ok/40 text-ok",
    bad: "border-bad/40 text-bad",
    muted: "border-line text-muted",
  }[tone];

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h4>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className={`rounded-full border px-3 py-1 text-xs ${toneClass}`}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
