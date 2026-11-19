import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy } from "lucide-react";

import { useToast } from "../../context/ToastContext";
import { api, errorMessage } from "../../lib/api";
import { formatDateTime } from "../../lib/dates";
import { versionTitle } from "../../lib/resumes";
import type { JobMatch, MatchPrompt, ResumeSummary } from "../../lib/types";
import Button from "../ui/Button";
import SelectMenu from "../ui/SelectMenu";
import { LoadingText } from "../ui/Spinner";
import Textarea from "../ui/Textarea";
import MatchResult from "./MatchResult";

const SOURCES = ["ChatGPT", "Claude", "Other"];

// The match of one job with a resume version. FORGE builds a text, the user pastes it into
// ChatGPT or Claude and pastes the answer back, and FORGE works out the percent and the advice.
export default function MatchPanel({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [checking, setChecking] = useState(false); // the two steps are open
  const [pickedResumeId, setPickedResumeId] = useState<string | null>(null); // null = the current version
  const [prompt, setPrompt] = useState<string | null>(null); // the text built in step 1
  const [source, setSource] = useState(SOURCES[0]);
  const [answer, setAnswer] = useState("");
  const [pickedMatchId, setPickedMatchId] = useState<string | null>(null); // null = the newest result

  const resumes = useQuery({
    queryKey: ["resumes"],
    queryFn: () => api.get<ResumeSummary[]>("/resumes"),
  });

  const matches = useQuery({
    queryKey: ["job-matches", jobId],
    queryFn: () => api.get<JobMatch[]>(`/job-matches?jobId=${jobId}`),
  });

  const resumeList = resumes.data ?? [];
  const resumeId = pickedResumeId ?? resumeList.find((resume) => resume.isCurrent)?._id ?? "";

  // step 1: the server builds the text to paste into ChatGPT or Claude
  const buildPrompt = useMutation({
    mutationFn: () => api.post<MatchPrompt>("/job-matches/prompt", { jobId, resumeId }),
    onSuccess: (data) => setPrompt(data.prompt),
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  // step 2: the pasted answer goes to the server, which works out the percent
  const getResult = useMutation({
    mutationFn: () => api.post<JobMatch>("/job-matches", { jobId, resumeId, source, answer }),
    onSuccess: async (match) => {
      await queryClient.invalidateQueries({ queryKey: ["job-matches", jobId] });
      setPickedMatchId(match._id);
      setAnswer("");
      setPrompt(null);
      setChecking(false);
      showToast("Match calculated");
    },
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  async function copyPrompt() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      showToast("Text copied");
    } catch {
      showToast("Could not copy. Select the text and copy it.", "error");
    }
  }

  const matchList = matches.data ?? [];
  const shownMatch = matchList.find((match) => match._id === pickedMatchId) ?? matchList[0];
  const resumeTitleOf = (id: string) => {
    const found = resumeList.find((resume) => resume._id === id);
    return found ? versionTitle(found) : "";
  };

  return (
    <section className="flex flex-col gap-4" aria-label="Match with your resume">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 text-base font-semibold">Resume match</h2>
        <Button variant="secondary" size="sm" onClick={() => setChecking(!checking)}>
          {checking ? "Close" : "Check match"}
        </Button>
      </div>

      {checking && (
        <div className="flex flex-col gap-5 rounded-xl border border-line bg-panel p-4">
          {resumes.isSuccess && resumeList.length === 0 ? (
            <p className="text-sm text-muted">
              Save a resume first.{" "}
              <Link to="/resumes" className="text-accent hover:underline">
                Go to Resumes
              </Link>
            </p>
          ) : (
            <>
              <SelectMenu
                label="Resume version"
                value={resumeId}
                options={resumeList.map((resume) => ({
                  value: resume._id,
                  label: `${versionTitle(resume)}${resume.isCurrent ? " (current)" : ""}`,
                }))}
                onChange={(value) => {
                  setPickedResumeId(value);
                  setPrompt(null); // the text depends on the version, so it is built again
                }}
              />

              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Step 1. Copy this text and paste it into ChatGPT or Claude.</p>
                {prompt === null ? (
                  <Button
                    className="w-fit"
                    loading={buildPrompt.isPending}
                    disabled={!resumeId}
                    onClick={() => buildPrompt.mutate()}
                  >
                    Build the text
                  </Button>
                ) : (
                  <>
                    <Textarea label="Text to copy" rows={6} readOnly value={prompt} />
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="secondary" size="sm" onClick={copyPrompt}>
                        <Copy size={14} aria-hidden="true" />
                        Copy
                      </Button>
                      <span className="text-xs text-muted">Contact details are removed from your resume in this text.</span>
                    </div>
                  </>
                )}
              </div>

              {prompt !== null && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">Step 2. Paste the answer here.</p>

                  <div role="radiogroup" aria-label="Where the answer came from" className="flex flex-wrap gap-2">
                    {SOURCES.map((name) => (
                      <Button
                        key={name}
                        size="sm"
                        role="radio"
                        aria-checked={source === name}
                        variant={source === name ? "primary" : "secondary"}
                        onClick={() => setSource(name)}
                      >
                        {name}
                      </Button>
                    ))}
                  </div>

                  <Textarea
                    label="The answer"
                    rows={6}
                    value={answer}
                    placeholder="Paste the answer of ChatGPT or Claude here"
                    onChange={(event) => setAnswer(event.target.value)}
                  />
                  <Button
                    className="w-fit"
                    loading={getResult.isPending}
                    disabled={!answer.trim()}
                    onClick={() => getResult.mutate()}
                  >
                    Get result
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {matches.isPending && <LoadingText>Loading the results…</LoadingText>}
      {matches.isError && <p className="text-sm text-bad">The results could not be loaded.</p>}

      {matches.isSuccess && matchList.length === 0 && !checking && (
        <p className="text-sm text-muted">No match yet. Press "Check match" to compare this job with your resume.</p>
      )}

      {shownMatch && (
        <>
          {matchList.length > 1 && (
            <div className="w-full sm:w-72">
              <SelectMenu
                label="Older results"
                value={shownMatch._id}
                options={matchList.map((match) => ({
                  value: match._id,
                  label: `${formatDateTime(match.createdAt)} · ${Math.round(match.percent)}%`,
                }))}
                onChange={setPickedMatchId}
              />
            </div>
          )}
          <MatchResult match={shownMatch} resumeTitle={resumeTitleOf(shownMatch.resumeId)} />
        </>
      )}
    </section>
  );
}
