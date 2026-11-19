import { MAX_NOTE } from "../../lib/resumes";
import Input from "../ui/Input";

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
}

// The note field of a resume version: a short description with a character counter.
// The new-version form and the edit-note form both use it.
export default function NoteInput({ value, onChange }: NoteInputProps) {
  return (
    <Input
      label="Note"
      value={value}
      maxLength={MAX_NOTE}
      counter={`${value.length}/${MAX_NOTE}`}
      placeholder="A short description of this version"
      autoFocus
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
