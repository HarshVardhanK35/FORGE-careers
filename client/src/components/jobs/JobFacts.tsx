import { Globe, MapPin, Wallet } from "lucide-react";

interface JobFactsProps {
  location: string;
  source: string;
  salaryRange?: string; // shown on the job page only
  className?: string;
}

// The small facts of a job, each on its own with an icon: where it is, where it was found,
// and (when given) the salary. A fact that is empty is left out. The list rows and the job
// page both use it.
export default function JobFacts({ location, source, salaryRange = "", className = "" }: JobFactsProps) {
  const facts = [
    { Icon: MapPin, text: location, label: "Location" },
    { Icon: Globe, text: source, label: "Found on" },
    { Icon: Wallet, text: salaryRange, label: "Salary range" },
  ].filter((fact) => fact.text);

  if (facts.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted ${className}`}>
      {facts.map(({ Icon, text, label }) => (
        <li key={label} className="flex items-center gap-1.5" title={label}>
          <Icon size={13} className="shrink-0" aria-label={label} />
          <span className="break-words">{text}</span>
        </li>
      ))}
    </ul>
  );
}
