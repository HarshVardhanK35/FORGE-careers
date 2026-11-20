import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "../../context/ToastContext";
import { api, errorMessage } from "../../lib/api";
import { istDateKey } from "../../lib/dates";
import { ROUND_RESULT_LABELS, ROUND_TYPE_LABELS } from "../../lib/stages";
import type { Round, RoundInput, RoundResult, RoundType } from "../../lib/types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import SelectMenu from "../ui/SelectMenu";
import Textarea from "../ui/Textarea";

const MAX_NOTES = 300; // the same limits as the server
const MAX_FEEDBACK = 500;

interface RoundModalProps {
  applicationId: string;
  round?: Round; // given: the round is edited; missing: a new round is added
  onClose: () => void;
}

// A form in a modal to add an interview round, or to edit one (an edit also has the result and the feedback).
export default function RoundModal({ applicationId, round, onClose }: RoundModalProps) {
  const editing = Boolean(round);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [date, setDate] = useState(round ? istDateKey(round.date) : "");
  const [type, setType] = useState<RoundType>(round?.type ?? "technical");
  const [notes, setNotes] = useState(round?.notes ?? "");
  const [result, setResult] = useState<RoundResult>(round?.result ?? "pending");
  const [feedback, setFeedback] = useState(round?.feedback ?? "");

  const save = useMutation({
    mutationFn: (input: RoundInput) =>
      round
        ? api.patch(`/applications/${applicationId}/rounds/${round._id}`, input)
        : api.post(`/applications/${applicationId}/rounds`, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["applications"] });
      showToast(editing ? "Round saved" : "Round added");
      onClose();
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!date) return;

    const input: RoundInput = { date, type, notes: notes.trim() };
    if (editing) {
      input.result = result;
      input.feedback = feedback.trim();
    }
    save.mutate(input);
  }

  return (
    <Modal title={editing ? `Edit round ${round?.number}` : "Add an interview round"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Date" type="date" value={date} autoFocus onChange={(event) => setDate(event.target.value)} />
          <SelectMenu
            label="Type"
            value={type}
            options={Object.entries(ROUND_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
            onChange={(value) => setType(value as RoundType)}
          />
        </div>

        <Textarea
          label="Notes (optional)"
          rows={3}
          maxLength={MAX_NOTES}
          value={notes}
          placeholder="Who you spoke to, what to prepare"
          counter={`${notes.length}/${MAX_NOTES}`}
          onChange={(event) => setNotes(event.target.value)}
        />

        {editing && (
          <>
            <SelectMenu
              label="Result"
              value={result}
              options={Object.entries(ROUND_RESULT_LABELS).map(([value, label]) => ({ value, label }))}
              onChange={(value) => setResult(value as RoundResult)}
            />
            <Textarea
              label="Feedback (optional)"
              rows={3}
              maxLength={MAX_FEEDBACK}
              value={feedback}
              placeholder="What went well, what to improve"
              counter={`${feedback.length}/${MAX_FEEDBACK}`}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </>
        )}

        {save.isError && (
          <p role="alert" className="text-sm text-bad">
            {errorMessage(save.error)}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" className="max-md:flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="max-md:flex-1" loading={save.isPending} disabled={!date}>
            {editing ? "Save round" : "Add round"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
