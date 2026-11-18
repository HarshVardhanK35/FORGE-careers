// simple checks used by the forms, kept in one place

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export interface PasswordRule {
  label: string;
  met: boolean;
}

// the same rules the server checks when the account is created
export function passwordRules(password: string): PasswordRule[] {
  return [
    { label: "8 or more characters", met: password.length >= 8 },
    { label: "A letter", met: /[A-Za-z]/.test(password) },
    { label: "A number", met: /\d/.test(password) },
    { label: "A symbol", met: /[^A-Za-z0-9]/.test(password) },
  ];
}

export function isPasswordValid(password: string): boolean {
  return passwordRules(password).every((rule) => rule.met);
}
