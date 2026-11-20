import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2 } from "lucide-react";

import FollowUpSection from "../components/tracker/FollowUpSection";
import MatchSummary from "../components/tracker/MatchSummary";
import RoundsSection from "../components/tracker/RoundsSection";
import StageBadge from "../components/tracker/StageBadge";
import StageSection from "../components/tracker/StageSection";
import ConfirmModal from "../components/ui/ConfirmModal";
import { LoadingText } from "../components/ui/Spinner";
import { usePageTitle } from "../context/PageHeaderContext";
import { useToast } from "../context/ToastContext";
import { api, errorMessage, isApiFailure } from "../lib/api";
import { formatDate } from "../lib/dates";
import { STAGE_LABELS, isFinalStage } from "../lib/stages";
import type { ApplicationDetail, Stage } from "../lib/types";

// One application: the stage with its history, the follow-up date and the interview rounds.
export default function ApplicationPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const application = useQuery({
    queryKey: ["applications", "detail", id],
    queryFn: () => api.get<ApplicationDetail>(`/applications/${id}`),
  });

  // every change reloads everything under ["applications"]: this page, the list, the counts and the chip
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["applications"] });

  const changeStage = useMutation({
    mutationFn: (stage: Stage) => api.patch(`/applications/${id}/stage`, { stage }),
    onSuccess: async (_data, stage) => {
      await refresh();
      showToast(`Stage changed to ${STAGE_LABELS[stage]}`);
    },
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  const saveFollowUp = useMutation({
    mutationFn: (date: string | null) => api.patch(`/applications/${id}/follow-up`, { followUpDate: date }),
    onSuccess: async (_data, date) => {
      await refresh();
      showToast(date ? "Follow-up date saved" : "Follow-up date cleared");
    },
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  const remove = useMutation({
    mutationFn: () => api.delete(`/applications/${id}`),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["applications", "detail", id] });
      await refresh();
      navigate("/tracker");
    },
  });

  usePageTitle(application.data ? application.data.jobId.title : "Application");

  if (application.isPending) {
    return <LoadingText>Loading this application…</LoadingText>;
  }

  if (application.isError) {
    const notFound = isApiFailure(application.error) && application.error.status === 404;
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-bad">
          {notFound ? "This application was not found." : "This application could not be loaded."}
        </p>
        <Link to="/tracker" className="text-sm text-accent hover:underline">
          Back to the tracker
        </Link>
      </div>
    );
  }

  const data = application.data;
  const final = isFinalStage(data.stage);

  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      {/* the list is on the left on a desktop, so the back link is for a phone only */}
      <Link to="/tracker" className="flex w-fit items-center gap-1 text-sm text-muted hover:text-fg md:hidden">
        <ArrowLeft size={14} aria-hidden="true" />
        All applications
      </Link>

      <div className="flex flex-col gap-2">
        {/* the title, with the delete icon at the far right on the same line */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 break-words text-xl font-semibold">{data.jobId.title}</h2>
          <button
            type="button"
            aria-label="Delete this application"
            onClick={() => setConfirmingDelete(true)}
            className="shrink-0 rounded-lg p-2 text-muted hover:bg-line/40 hover:text-bad focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-x-5">
          <p className="break-words text-base text-muted">{data.jobId.company}</p>
          <StageBadge stage={data.stage} />
          <Link to={`/jobs/${data.jobId._id}`} className="w-fit text-sm text-accent hover:underline">
            Open the job
          </Link>
        </div>

        <p className="text-sm text-muted">
          Applied {formatDate(data.appliedAt)}
          {data.resumeId && ` · Resume v${data.resumeId.versionNumber}`}
        </p>
      </div>

      <StageSection
        key={data.stage}
        stage={data.stage}
        history={data.history}
        busy={changeStage.isPending}
        onUpdate={(stage) => changeStage.mutate(stage)}
      />

      {/* the follow-up and the match side by side (a final application needs no follow-up, so the match fills the row) */}
      <div className="grid items-start gap-4 md:grid-cols-2">
        {!final && (
          <FollowUpSection
            key={data.followUpDate ?? "none"}
            followUpDate={data.followUpDate}
            busy={saveFollowUp.isPending}
            onSave={(date) => saveFollowUp.mutate(date)}
          />
        )}
        <MatchSummary jobId={data.jobId._id} className={final ? "md:col-span-2" : ""} />
      </div>

      <RoundsSection applicationId={data._id} rounds={data.rounds} />

      {confirmingDelete && (
        <ConfirmModal
          title="Delete this application?"
          message={`${data.jobId.title} at ${data.jobId.company} will be removed from the tracker. The job stays saved.`}
          busy={remove.isPending}
          error={remove.isError ? errorMessage(remove.error) : ""}
          onConfirm={() => remove.mutate()}
          onClose={() => setConfirmingDelete(false)}
        />
      )}
    </div>
  );
}
