import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "../../context/ToastContext";
import { api, errorMessage } from "../../lib/api";
import type { NewResumeInput, Resume } from "../../lib/types";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Textarea from "../ui/Textarea";
import NoteInput from "./NoteInput";

const MAX_TEXT = 20000; // the same limit as the server
const MIN_CHECK_TEXT = 300; // a shorter text is saved, but the AI check refuses it

interface NewVersionModalProps {
  nextNumber: number; // the number the new version will get, shown in the message under the form
  onClose: () => void;
}

// A form in a modal: a required note and the pasted resume text. The server names the version.
export default function NewVersionModal({ nextNumber, onClose }: NewVersionModalProps) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [note, setNote] = useState("");
  const [text, setText] = useState("");

  // useMutation: runs a change on the server; "isPending" is true while it runs
  const save = useMutation({
    mutationFn: (input: NewResumeInput) => api.post<Resume>("/resumes", input),
    onSuccess: async () => {
      // the list is out of date now, so it is loaded again before the modal closes
      await queryClient.invalidateQueries({ queryKey: ["resumes"] });
      showToast("Version saved");
      onClose();
    },
  });

  const length = text.trim().length;
  const tooLong = length > MAX_TEXT;
  const textHint = length > 0 && length < MIN_CHECK_TEXT ? "Under 300 characters cannot be checked by the AI." : undefined;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (length === 0 || tooLong || note.trim().length === 0) return;

    save.mutate({ text: text.trim(), note: note.trim() });
  }

  return (
    <Modal title="New resume version" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <NoteInput value={note} onChange={setNote} />
        <Textarea
          label="Resume text"
          rows={10}
          value={text}
          placeholder="Copy the text from your resume file and paste it here"
          counter={`${length.toLocaleString()} / ${MAX_TEXT.toLocaleString()}`}
          error={tooLong ? "This is too long. Shorten it to 20,000 characters or fewer." : undefined}
          hint={textHint}
          onChange={(event) => setText(event.target.value)}
        />

        <p className="text-xs text-muted">It is saved as v{nextNumber} and becomes the current version.</p>

        {save.isError && (
          <p role="alert" className="text-sm text-bad">
            {errorMessage(save.error)}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={save.isPending} disabled={length === 0 || tooLong || note.trim().length === 0}>
            Save version
          </Button>
        </div>
      </form>
    </Modal>
  );
}
