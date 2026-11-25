import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, CornerDownRight, Lock, TriangleAlert, WifiOff } from "lucide-react";

import CenteredCard from "../components/test/CenteredCard";
import QuestionPanel from "../components/test/QuestionPanel";
import StepRow from "../components/test/StepRow";
import { ExitModal, FinishModal, MarkingModal, ResultModal } from "../components/test/TestModals";
import TestTopBar from "../components/test/TestTopBar";
import type { SaveStatus } from "../components/test/TestTopBar";
import Button from "../components/ui/Button";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { api, errorMessage, isApiFailure } from "../lib/api";
import { formatWait } from "../lib/roadmap";
import type { Roadmap, TestAttempt, TestResult } from "../lib/types";

type Modal = null | "finish" | "exit" | "marking" | TestResult;

// the page fills the screen: the top bar, then the content
const FRAME = "flex h-dvh flex-col bg-canvas text-fg";

// what the test page says when the test cannot be started: the reason comes from the roadmap
function NotOpen({ skillId, level, onBack }: { skillId: string; level: number; onBack: () => void }) {
  const roadmap = useQuery({ queryKey: ["roadmap"], queryFn: () => api.get<Roadmap>("/roadmap") });
  const levelView = roadmap.data?.skills.find((skill) => skill.id === skillId)?.levels[level - 1];

  let reason = "This level is not open yet.";
  if (levelView?.state === "passed") reason = "This level is already passed.";
  else if (levelView?.state === "waiting" && levelView.nextAttemptAt) {
    reason = `Next attempt in ${formatWait(new Date(levelView.nextAttemptAt).getTime() - Date.now())}.`;
  } else if (levelView?.reason) reason = `${levelView.reason}.`;

  return (
    <div className={FRAME}>
      <TestTopBar title="Test" status={null} onExit={null} />
      <CenteredCard icon={Lock} tone="muted" title="This test isn't open yet" message={reason} actionLabel="Back to Skills" onAction={onBack} />
    </div>
  );
}

// The test of one level: one question at a time, saved on the server as he goes, resumable after a break.
export default function SkillTestPage() {
  const { skillId = "" } = useParams();
  const [searchParams] = useSearchParams();
  const level = Number(searchParams.get("level") ?? 1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const desktop = useIsDesktop();

  const queryKey = ["test", skillId, level];
  const attempt = useQuery({
    queryKey,
    // starts the test, or continues the unfinished one (the server decides)
    queryFn: () => api.post<TestAttempt>("/tests/start", { skillId, level }),
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [shown, setShown] = useState<number | null>(null); // the question on the screen (null = where he stopped)
  const [resume, setResume] = useState<number | null | undefined>(undefined); // the "Continuing from question n" banner
  const [draftsA, setDraftsA] = useState<Record<string, string>>({});
  const [draftsC, setDraftsC] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [failed, setFailed] = useState<{ questionId: string; patch: object } | null>(null);
  const [modal, setModal] = useState<Modal>(null);
  const [finishError, setFinishError] = useState("");

  // The question on the screen starts where he stopped and then only moves when he moves it: without this,
  // answering a question would open the next one by itself.
  useEffect(() => {
    if (attempt.data && shown === null) setShown(attempt.data.current);
  }, [attempt.data, shown]);

  const toSkills = () => {
    queryClient.removeQueries({ queryKey });
    navigate("/skills");
  };

  if (attempt.isPending) {
    return (
      <div className={FRAME}>
        <TestTopBar title="Test" status={null} onExit={toSkills} />
        <div role="status" aria-busy="true" aria-label="Loading the test" className="mx-auto flex w-full max-w-180 flex-col gap-6 px-4 py-8 md:px-6">
          <div className="h-7 w-52 animate-pulse rounded-lg bg-muted/15" />
          <div className="h-40 animate-pulse rounded-xl bg-muted/15" />
          <div className="h-5 w-56 animate-pulse rounded-lg bg-muted/15" />
          <div className="h-22 animate-pulse rounded-lg bg-muted/15" />
        </div>
      </div>
    );
  }

  if (attempt.isError) {
    const error = attempt.error;
    if (isApiFailure(error) && error.status === 409) {
      return <NotOpen skillId={skillId} level={level} onBack={toSkills} />;
    }
    if (isApiFailure(error) && error.status === 404) {
      return (
        <div className={FRAME}>
          <TestTopBar title="Test" status={null} onExit={null} />
          <CenteredCard icon={Lock} tone="muted" title="No test here yet" message={errorMessage(error)} actionLabel="Back to Skills" onAction={toSkills} />
        </div>
      );
    }
    return (
      <div className={FRAME}>
        <TestTopBar title="Test" status={null} onExit={toSkills} />
        <CenteredCard
          icon={WifiOff}
          tone="bad"
          title="Couldn't load the test"
          message="Check your connection and try again."
          actionLabel="Try again"
          onAction={() => attempt.refetch()}
        />
      </div>
    );
  }

  const data = attempt.data;
  const number = Math.min(Math.max(shown ?? data.current, 1), data.reached);
  const question = data.questions[number - 1];

  // the banner appears once, when a test he left is opened again
  const resumeNumber = resume === undefined && (data.current > 1 || data.questions[0]?.partA.locked) ? data.current : (resume ?? null);

  const draftA = draftsA[question.id] ?? "";
  const draftC = draftsC[question.id] ?? question.partC?.answer ?? "";

  // saves one part of one answer; the answer of the server replaces the cached test
  async function save(questionId: string, patch: { partA?: string; partB?: number; partC?: string }): Promise<boolean> {
    setSaveStatus("saving");
    setResume(null);
    try {
      const view = await api.patch<TestAttempt>(`/tests/${data.id}/answers/${questionId}`, patch);
      queryClient.setQueryData(queryKey, view);
      setSaveStatus("saved");
      setFailed(null);
      return true;
    } catch {
      setSaveStatus("error");
      setFailed({ questionId, patch });
      return false;
    }
  }

  // Part C is saved when he presses Next
  const partCReady = !!question.partC && question.partB?.chosen !== undefined && draftC.trim().length > 0;
  const canNext = (question.complete || partCReady) && saveStatus !== "error";

  async function next() {
    if (!canNext) return;
    if (question.partC && draftC.trim() !== (question.partC.answer ?? "")) {
      if (!(await save(question.id, { partC: draftC }))) return;
    }
    setResume(null);
    if (number === data.total) setModal("finish");
    else setShown(number + 1);
  }

  async function finish() {
    setFinishError("");
    setModal("marking");
    try {
      const result = await api.post<TestResult>(`/tests/${data.id}/finish`);
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
      setModal(result);
    } catch (error) {
      setFinishError(errorMessage(error));
      setModal("finish");
    }
  }

  const go = (target: number) => {
    setResume(null);
    setShown(target);
  };

  const buttons = (
    <>
      <Button variant="secondary" disabled={number <= 1} onClick={() => go(number - 1)} className="max-md:min-h-11 max-md:flex-1">
        <ArrowLeft size={16} aria-hidden="true" />
        Back
      </Button>
      <Button disabled={!canNext} onClick={next} className="max-md:min-h-11 max-md:flex-[2]">
        {number === data.total ? "Finish" : "Next"}
        {number === data.total ? <Check size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
      </Button>
    </>
  );

  return (
    <div className={FRAME}>
      <TestTopBar
        title={`${data.skillName} · Level ${data.level} · ${data.levelName}`}
        status={saveStatus}
        onExit={() => setModal("exit")}
      />
      <StepRow total={data.total} reached={data.reached} current={number} questions={data.questions} onGo={go} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-180 flex-col gap-5 px-4 py-5 md:gap-6 md:px-6 md:py-8">
          {resumeNumber !== null && (
            <div role="status" className="flex items-center gap-2 rounded-lg border border-accent/45 bg-accent/8 px-3 py-2 text-sm">
              <CornerDownRight size={16} aria-hidden="true" />
              Continuing from question {resumeNumber}.
            </div>
          )}

          <QuestionPanel
            key={question.id}
            question={question}
            total={data.total}
            draftA={draftA}
            draftC={draftC}
            busy={saveStatus === "saving"}
            onDraftA={(text) => setDraftsA((current) => ({ ...current, [question.id]: text }))}
            onDraftC={(text) => setDraftsC((current) => ({ ...current, [question.id]: text }))}
            onContinue={() => save(question.id, { partA: draftA })}
            onChoose={(position) => save(question.id, { partB: position })}
          />

          {failed && (
            <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-bad/50 bg-bad/8 px-4 py-3 text-sm">
              <TriangleAlert size={20} className="shrink-0 text-bad" aria-hidden="true" />
              <span className="min-w-0 flex-1">Couldn't save your answer. Check your connection.</span>
              <Button variant="secondary" size="sm" onClick={() => save(failed.questionId, failed.patch)}>
                Try again
              </Button>
            </div>
          )}

          {desktop && <div className="flex justify-between border-t border-line pt-6">{buttons}</div>}
        </div>
      </main>

      {!desktop && <div className="flex gap-2 border-t border-line bg-canvas p-3">{buttons}</div>}

      {modal === "finish" && <FinishModal error={finishError} onConfirm={finish} onClose={() => setModal(null)} />}
      {modal === "exit" && <ExitModal onStay={() => setModal(null)} onLeave={toSkills} />}
      {modal === "marking" && <MarkingModal />}
      {modal !== null && typeof modal === "object" && <ResultModal result={modal} level={data.level} onBack={toSkills} />}
    </div>
  );
}

