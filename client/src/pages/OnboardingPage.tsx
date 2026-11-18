import { useState } from "react";
import { Navigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import ProfileStep from "../components/onboarding/ProfileStep";
import SkillsStep from "../components/onboarding/SkillsStep";
import { useAuth } from "../context/AuthContext";
import { useOnboarding } from "../hooks/useOnboarding";

// The two onboarding steps: step 1 saves the profile, step 2 chooses the focus skills.
export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const onboarding = useOnboarding();
  const { logout } = useAuth();

  // a way out for a user who does not want to finish now; the next sign-in comes back here
  const leave = (
    <>
      Not ready to continue?{" "}
      <button type="button" onClick={() => logout()} className="text-accent hover:underline">
        Sign out
      </button>
    </>
  );

  // nothing to do here once onboarding is complete
  if (onboarding.data?.onboardingComplete) {
    return <Navigate to="/" replace />;
  }

  if (step === 1) {
    return (
      <AuthLayout title="Step 1 of 2: About you" footer={leave}>
        <ProfileStep onSaved={() => setStep(2)} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout wide title="Step 2 of 2: Choose your focus skills" footer={leave}>
      <SkillsStep onBack={() => setStep(1)} />
    </AuthLayout>
  );
}
