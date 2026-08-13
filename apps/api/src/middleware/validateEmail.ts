export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  if (email.trim().length === 0) return false;
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email);
}

export default isValidEmail;
