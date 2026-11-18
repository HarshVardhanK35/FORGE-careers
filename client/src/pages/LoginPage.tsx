import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { isApiFailure } from "../lib/api";
import { isValidEmail } from "../lib/validation";

export default function LoginPage() {
  const { login, sessionEnded } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    // check the fields before calling the server
    const emailProblem = isValidEmail(email) ? "" : "Enter a valid email address";
    const passwordProblem = password ? "" : "Enter your password";
    setEmailError(emailProblem);
    setPasswordError(passwordProblem);
    if (emailProblem || passwordProblem) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      // signed in: the page guard moves us to Home
    } catch (error) {
      setFormError(isApiFailure(error) ? error.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Sign in"
      notice={sessionEnded ? "Your session ended. Please sign in again." : undefined}
      footer={
        <>
          First time here?{" "}
          <Link to="/signup" className="text-accent hover:underline">
            Create the account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={emailError}
        />

        <PasswordInput
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={passwordError}
        />

        {formError && (
          <p role="alert" className="text-sm text-bad">
            {formError}
          </p>
        )}

        <Button type="submit" loading={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
