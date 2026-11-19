import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface DeleteVersionModalProps {
  title: string; // for example "Resume v2"
  deleting: boolean; // true while the request runs
  error: string; // the message of a failed delete, or an empty text
  onConfirm: () => void;
  onClose: () => void;
}

// Asks before a version is deleted. The page runs the delete; this only draws the question.
export default function DeleteVersionModal({ title, deleting, error, onConfirm, onClose }: DeleteVersionModalProps) {
  return (
    <Modal title="Delete this version?" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <p className="text-xs md:text-sm">{title} and its checks will be deleted. This cannot be undone.</p>
        <p className="text-xs text-muted">Later versions are renumbered.</p>

        {error && (
          <p role="alert" className="text-sm text-bad">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" loading={deleting} onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
