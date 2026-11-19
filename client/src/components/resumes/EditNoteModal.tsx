import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "../../context/ToastContext";
import { api, errorMessage } from "../../lib/api";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import NoteInput from "./NoteInput";

interface EditNoteModalProps {
  resumeId: string;
  currentNote: string;
  onClose: () => void;
}

// A small form in a modal to change the note of a version (the resume text never changes).
export default function EditNoteModal({ resumeId, currentNote, onClose }: EditNoteModalProps) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [note, setNote] = useState(currentNote);

  const save = useMutation({
    mutationFn: (value: string) => api.patch(`/resumes/${resumeId}/note`, { note: value }),
    onSuccess: async () => {
      // ["resumes"] also matches this version and the list, so both show the new note
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
      showToast("Note saved");
      onClose();
    },
  });

  const empty = note.trim().length === 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (empty) return;
    save.mutate(note.trim());
  }

  return (
    <Modal title="Edit note" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <NoteInput value={note} onChange={setNote} />

        {save.isError && (
          <p role="alert" className="text-sm text-bad">
            {errorMessage(save.error)}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={save.isPending} disabled={empty || note.trim() === currentNote}>
            Save note
          </Button>
        </div>
      </form>
    </Modal>
  );
}
