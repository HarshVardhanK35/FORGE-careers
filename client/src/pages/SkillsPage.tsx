import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudOff, GraduationCap, LockOpen, RefreshCw } from "lucide-react";

import ProjectsSection from "../components/skills/ProjectsSection";
import SkillPanel from "../components/skills/SkillPanel";
import SkillRow from "../components/skills/SkillRow";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import { usePageTitle } from "../context/PageHeaderContext";
import { useToast } from "../context/ToastContext";
import { useNow } from "../hooks/useNow";
import { api, errorMessage } from "../lib/api";
import { currentSkill, TIER_LABELS, TIERS } from "../lib/roadmap";
import type { Roadmap } from "../lib/types";

// grey blocks while the roadmap loads
function Skeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading skills" className="mx-auto flex max-w-250 flex-col gap-7">
      {[4, 3, 2].map((rows) => (
        <div key={rows} className="flex flex-col gap-2">
          <div className="h-3 w-22 animate-pulse rounded bg-muted/15" />
          <div className="divide-y divide-line rounded-xl border border-line bg-panel">
            {Array.from({ length: rows }, (_, index) => (
              <div key={index} className="flex items-center gap-3 p-4">
                <div className="h-5 w-5 animate-pulse rounded-full bg-muted/15" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="h-3 w-1/2 max-w-60 animate-pulse rounded bg-muted/15" />
                  <div className="h-2 w-1/4 max-w-30 animate-pulse rounded bg-muted/15" />
                </div>
                <div className="h-5.5 w-28 animate-pulse rounded-md bg-muted/15" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// The Skills page: the skills in three tiers (each opens to its topics and level cards), and the project parts.
export default function SkillsPage() {
  usePageTitle("Skills");
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const now = useNow();

  const roadmap = useQuery({ queryKey: ["roadmap"], queryFn: () => api.get<Roadmap>("/roadmap") });

  // undefined = nothing chosen yet, so the skill he is working on is open; null = all closed
  const [openId, setOpenId] = useState<string | null | undefined>(undefined);
  const [unlockId, setUnlockId] = useState<string | null>(null);

  // every change answers with the new roadmap, which replaces the cached one
  function keepAnswer(answer: Roadmap) {
    queryClient.setQueryData(["roadmap"], answer);
  }

  const tick = useMutation({
    mutationFn: ({ topicId, done }: { topicId: string; done: boolean }) =>
      api.patch<Roadmap>(`/roadmap/topics/${topicId}`, { done }),
    onSuccess: keepAnswer,
    onError: (error) => showToast(errorMessage(error), "error"),
  });

  const resource = useMutation({
    mutationFn: ({ topicId, text }: { topicId: string; text: string }) =>
      api.patch<Roadmap>(`/roadmap/topics/${topicId}`, { resource: text }),
    onSuccess: (answer) => {
      keepAnswer(answer);
      showToast("Saved");
    },
  });

  const unlock = useMutation({
    mutationFn: (skillId: string) => api.post<Roadmap>(`/roadmap/skills/${skillId}/unlock`),
    onSuccess: (answer, skillId) => {
      keepAnswer(answer);
      setUnlockId(null);
      setOpenId(skillId);
    },
  });

  if (roadmap.isPending) return <Skeleton />;

  if (roadmap.isError) {
    return (
      <div role="alert" className="mx-auto mt-8 flex max-w-100 flex-col items-start gap-3 rounded-xl border border-line bg-panel p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bad/15 text-bad">
          <CloudOff size={20} aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold">Couldn't load your skills</h2>
        <p className="text-sm text-muted">Check your connection, then try again.</p>
        <Button variant="secondary" onClick={() => roadmap.refetch()}>
          <RefreshCw size={14} aria-hidden="true" />
          Try again
        </Button>
      </div>
    );
  }

  const { skills, projects } = roadmap.data;

  if (skills.length === 0) {
    return (
      <div className="mx-auto mt-8 flex max-w-100 flex-col items-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel text-muted">
          <GraduationCap size={24} aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold">No skills yet</h2>
        <p className="text-sm text-muted">Skills will appear here once they are added.</p>
      </div>
    );
  }

  const expandedId = openId === undefined ? currentSkill(skills, now)?.id ?? null : openId;
  const unlockSkillIndex = skills.findIndex((skill) => skill.id === unlockId);
  const unlockTarget = unlockSkillIndex >= 0 ? skills[unlockSkillIndex] : null;
  const unlockPrevious = unlockSkillIndex > 0 ? skills[unlockSkillIndex - 1] : null;

  return (
    <div className="mx-auto flex max-w-250 flex-col gap-7">
      {TIERS.map((tier) => {
        const inTier = skills.filter((skill) => skill.tier === tier);
        if (inTier.length === 0) return null;

        return (
          <section key={tier} className="flex flex-col gap-2">
            <h2 className="flex items-baseline gap-2 text-xs font-semibold tracking-widest text-muted">
              {TIER_LABELS[tier]}
              <span className="font-normal tracking-normal">{inTier.length} skills</span>
            </h2>

            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
              {inTier.map((skill) => {
                const previous = skills[skill.order - 2];
                return (
                  <div key={skill.id}>
                    <SkillRow
                      skill={skill}
                      expanded={expandedId === skill.id}
                      now={now}
                      onToggle={() => setOpenId(expandedId === skill.id ? null : skill.id)}
                      onUnlock={() => setUnlockId(skill.id)}
                    />
                    {expandedId === skill.id && (
                      <SkillPanel
                        skill={skill}
                        previousName={previous?.name ?? ""}
                        now={now}
                        onUnlock={() => setUnlockId(skill.id)}
                        onTick={(topicId, done) => tick.mutate({ topicId, done })}
                        onSaveResource={async (topicId, text) => {
                          await resource.mutateAsync({ topicId, text });
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <ProjectsSection projects={projects} />

      {unlockTarget && unlockPrevious && (
        <ConfirmModal
          title={`Open ${unlockTarget.name} without finishing ${unlockPrevious.name}?`}
          message="The levels you have not passed will be marked as skipped."
          confirmLabel="Unlock anyway"
          icon={LockOpen}
          tone="primary"
          busy={unlock.isPending}
          error={unlock.error ? errorMessage(unlock.error) : ""}
          onConfirm={() => unlock.mutate(unlockTarget.id)}
          onClose={() => {
            unlock.reset();
            setUnlockId(null);
          }}
        />
      )}
    </div>
  );
}
