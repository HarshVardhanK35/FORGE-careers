import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
import PasswordChecks from "../components/auth/PasswordChecks";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { isApiFailure } from "../lib/api";
import { isPasswordValid, isValidEmail } from "../lib/validation";
import type { ApiFailure } from "../lib/api";

// turns the server's answer into a plain sentence for the user
function signupMessage(failure: ApiFailure): string {
  if (failure.message === "Not allowed") return "The setup secret is wrong.";
  if (failure.message === "Sign-up is closed") return "An account already exists. Sign in instead.";
  if (failure.status === 400) return "Please check the details and try again.";
  return failure.message;
}

export default function SignupPage() {
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [secret, setSecret] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", confirm: "", secret: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    // check the fields before calling the server
    const nextErrors = {
      email: isValidEmail(email) ? "" : "Enter a valid email address",
      password: isPasswordValid(password) ? "" : "The password does not meet the rules below",
      confirm: confirm === password ? "" : "The passwords do not match",
      secret: secret ? "" : "Enter the setup secret",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    try {
      await signup(email.trim(), password, secret);
      // the account is created and signed in: the page guard moves us on
    } catch (error) {
      setFormError(isApiFailure(error) ? signupMessage(error) : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Sign in
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
          error={errors.email}
        />

        <div className="flex flex-col gap-3">
          <PasswordInput
            label="Password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
          />
          <PasswordChecks password={password} />
        </div>

        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          error={errors.confirm}
        />

        <Input
          label="Setup secret"
          type="password"
          autoComplete="off"
          hint="From your server settings"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          error={errors.secret}
        />

        {formError && (
          <p role="alert" className="text-sm text-bad">
            {formError}
          </p>
        )}

        <Button type="submit" loading={submitting}>
          {submitting ? "Creating the account…" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
