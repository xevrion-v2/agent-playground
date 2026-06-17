/** Check if a string is a valid email */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
/** Check if a string is a valid URL */
export function isValidUrl(url: string): boolean {
  try { new URL(url); return true; } catch { return false; }
}
