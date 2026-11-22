import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudOff, LogOut, RefreshCw, TriangleAlert } from "lucide-react";

import AccountCard from "../components/profile/AccountCard";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import SaveBar from "../components/profile/SaveBar";
import SettingsCard from "../components/profile/SettingsCard";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ui/ConfirmModal";
import { useAuth } from "../context/AuthContext";
import { usePageTitle } from "../context/PageHeaderContext";
import { useToast } from "../context/ToastContext";
import { api } from "../lib/api";
import { sortGaps, toForm, toProfileBody, toSettingsBody, validate } from "../lib/profileForm";
import type { FieldKey, ProfileFormState } from "../lib/profileForm";
import type { ApplicationStats, Profile, Settings } from "../lib/types";

// the editor: the form, the checks, the save, and the "Leave without saving?" question
function ProfileEditor({ profile, settings }: { profile: Profile; settings: Settings }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { showToast } = useToast();

  // today's applications, for the line under the daily goal (the same cached answer as the header chip)
  const stats = useQuery({
    queryKey: ["applications", "stats"],
    queryFn: () => api.get<ApplicationStats>("/applications/stats"),
  });

  // base = what is saved; draft = what is on the screen
  const [base, setBase] = useState<ProfileFormState>(() => toForm(profile, settings));
  const [draft, setDraft] = useState<ProfileFormState>(base);
  const [submitted, setSubmitted] = useState(false); // Save was pressed: show every error
  const [saveFailed, setSaveFailed] = useState(false);
  const [leaveTo, setLeaveTo] = useState<string | null>(null); // where the user wanted to go ("signout" too)

  const dirty = JSON.stringify(draft) !== JSON.stringify(base);
  const errors = validate(draft);

  // the errors are shown after Save was pressed; fixing a field removes its error at once
  const hasErrors = Object.keys(errors.fields).length > 0 || Object.keys(errors.gaps).length > 0;
  const shown = (key: FieldKey) => (submitted ? errors.fields[key] ?? "" : "");

  const save = useMutation({
    mutationFn: async (form: ProfileFormState) => {
      await Promise.all([api.put("/profile", toProfileBody(form)), api.put("/settings", toSettingsBody(form))]);
    },
    onSuccess: (_result, form) => {
      setBase(form);
      setSubmitted(false);
      setSaveFailed(false);
      showToast("Saved");
      // the first letter in the account menu, the daily goal on Home and "Used today" read these
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => setSaveFailed(true),
  });

  function change(patch: Partial<ProfileFormState>) {
    setDraft((current) => ({ ...current, ...patch }));
    setSaveFailed(false);
  }

  function handleSave() {
    if (hasErrors) {
      setSubmitted(true); // nothing is sent; the errors appear
      return;
    }
    // the gaps are put in date order when saved, on the screen too
    const ordered = { ...draft, gaps: sortGaps(draft.gaps) };
    setDraft(ordered);
    save.mutate(ordered);
  }

  // Unsaved changes: a click on a link (side bar, tabs, menu) or on a "data-leave-guard" button
  // (Sign out) is stopped and asks first; a refresh or closing the tab shows the browser's own question.
  // The Back button is not stopped.
  useEffect(() => {
    if (!dirty) return;

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const link = target.closest("a[href]");
      if (link instanceof HTMLAnchorElement) {
        const sameTab = link.target !== "_blank" && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey;
        const url = new URL(link.href);
        const to = url.pathname + url.search;
        if (!sameTab || url.origin !== window.location.origin || to === window.location.pathname + window.location.search) return;

        event.preventDefault();
        event.stopPropagation();
        setLeaveTo(to);
        return;
      }

      if (target.closest("[data-leave-guard]")) {
        event.preventDefault();
        event.stopPropagation();
        setLeaveTo("signout");
      }
    }

    function handleUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }

    // "true" = capture phase: this runs before the link's own click handler
    document.addEventListener("click", handleClick, true);
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dirty]);

  function leave() {
    const to = leaveTo;
    setLeaveTo(null);
    if (to === "signout") logout();
    else if (to) navigate(to);
  }

  // a gap shows its error only after Save was pressed, like the other fields
  const cardProps = { form: draft, errors: submitted ? errors : { fields: {}, gaps: {} }, shown, onChange: change };

  return (
    <div className="flex min-h-full flex-col gap-6">
      <div className="mx-auto flex w-full max-w-180 flex-col gap-4">
        <ProfileCard {...cardProps} />
        <SettingsCard {...cardProps} appliedToday={stats.data?.today ?? 0} aiUsedToday={settings.aiUsedToday} savedAiLimit={base.dailyAiCallCap} />
        <AccountCard />
      </div>

      <SaveBar
        dirty={dirty}
        saving={save.isPending}
        saveFailed={saveFailed}
        hasErrors={submitted && hasErrors}
        onDiscard={() => {
          setDraft(base);
          setSubmitted(false);
          setSaveFailed(false);
        }}
        onSave={handleSave}
      />

      {leaveTo && (
        <ConfirmModal
          title="Leave without saving?"
          message="Your unsaved changes will be lost."
          confirmLabel="Leave without saving"
          icon={leaveTo === "signout" ? LogOut : TriangleAlert}
          tone="danger"
          onConfirm={leave}
          onClose={() => setLeaveTo(null)}
        />
      )}
    </div>
  );
}

// The Profile and settings page: loads both, then shows the editor.
export default function ProfilePage() {
  usePageTitle("Profile");

  const profile = useQuery({ queryKey: ["profile"], queryFn: () => api.get<Profile>("/profile") });
  const settings = useQuery({ queryKey: ["settings"], queryFn: () => api.get<Settings>("/settings") });

  if (profile.isError || settings.isError) {
    return (
      <div role="alert" className="flex max-w-120 flex-col items-start gap-3 rounded-xl border border-line bg-panel p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bad/15 text-bad">
          <CloudOff size={20} aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold">Couldn't load your profile</h2>
        <p className="text-sm text-muted">
          The server didn't answer. Check your connection, then try again. Nothing you saved before is lost.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            profile.refetch();
            settings.refetch();
          }}
        >
          <RefreshCw size={16} aria-hidden="true" />
          Try again
        </Button>
      </div>
    );
  }

  if (!profile.data || !settings.data) return <ProfileSkeleton />;

  return <ProfileEditor profile={profile.data} settings={settings.data} />;
}
