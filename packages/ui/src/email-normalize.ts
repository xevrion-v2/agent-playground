export function normalizeEmail(email: string | undefined): string | undefined {
  if (!email) return undefined;
  return email.trim().toLowerCase();
}
