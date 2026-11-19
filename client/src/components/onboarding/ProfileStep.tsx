import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Spinner from "../ui/Spinner";
import { api, errorMessage, isApiFailure } from "../../lib/api";
import type { Profile, ProfileInput } from "../../lib/types";

// the longest name the form accepts
const NAME_MAX_LENGTH = 30;

// the saved profile, or null when there is none yet (the server answers 404)
async function loadProfile(): Promise<Profile | null> {
  try {
    return await api.get<Profile>("/profile");
  } catch (error) {
    if (isApiFailure(error) && error.status === 404) return null;
    throw error;
  }
}

interface ProfileFormProps {
  initial: Profile | null;
  onSaved: () => void;
}

function ProfileForm({ initial, onSaved }: ProfileFormProps) {
  const queryClient = useQueryClient();

  // the fields start with the saved values, if the profile already exists
  const [name, setName] = useState(initial?.name ?? "");
  const [years, setYears] = useState(initial ? String(initial.yearsOfExperience) : "");
  const [hours, setHours] = useState(initial ? String(initial.hoursPerDay) : "");
  const [errors, setErrors] = useState({ name: "", years: "", hours: "" });

  // useMutation sends a change to the server and tells us if it is running or failed
  const save = useMutation({
    mutationFn: (body: ProfileInput) => api.put<Profile>("/profile", body),
    onSuccess: (saved) => {
      queryClient.setQueryData(["profile"], saved); // keep the cached profile up to date
      onSaved();
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const yearsNumber = Number(years);
    const hoursNumber = Number(hours);

    const nextErrors = {
      name: name.trim() ? "" : "Enter your name",
      years: years === "" || (yearsNumber >= 0 && yearsNumber <= 40) ? "" : "Enter a number from 0 to 40",
      hours: hours !== "" && hoursNumber >= 1 && hoursNumber <= 16 ? "" : "Enter the hours a day, from 1 to 16",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    save.mutate({
      name: name.trim(),
      hoursPerDay: hoursNumber,
      ...(years !== "" ? { yearsOfExperience: yearsNumber } : {}),
    });
  }

  const saveError = save.error ? errorMessage(save.error) : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Your name"
        autoComplete="name"
        autoFocus
        maxLength={NAME_MAX_LENGTH}
        counter={`${name.length}/${NAME_MAX_LENGTH}`}
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={errors.name}
      />

      <Input
        label="Years of experience (optional)"
        type="number"
        inputMode="decimal"
        step="0.1"
        min="0"
        value={years}
        onChange={(event) => setYears(event.target.value)}
        error={errors.years}
      />

      <Input
        label="Hours a day you can put in"
        type="number"
        inputMode="decimal"
        step="0.5"
        min="1"
        max="16"
        hint="Used to estimate the time each skill takes"
        value={hours}
        onChange={(event) => setHours(event.target.value)}
        error={errors.hours}
      />

      {saveError && (
        <p role="alert" className="text-sm text-bad">
          {saveError}
        </p>
      )}

      <Button type="submit" loading={save.isPending}>
        {save.isPending ? "Saving…" : "Continue"}
      </Button>
    </form>
  );
}

// Step 1: loads the saved profile (if any), then shows the form
export default function ProfileStep({ onSaved }: { onSaved: () => void }) {
  const profile = useQuery({ queryKey: ["profile"], queryFn: loadProfile });

  if (profile.isPending) {
    return (
      <div role="status" aria-label="Loading" className="flex justify-center py-8 text-muted">
        <Spinner size={24} />
      </div>
    );
  }

  if (profile.isError) {
    return <p className="text-sm text-bad">Could not load your profile. Please reload the page.</p>;
  }

  return <ProfileForm initial={profile.data} onSaved={onSaved} />;
}
