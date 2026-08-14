/**
 * Safely limits a request body to a maximum size.
 * @param body - The request body.
 * @param maxSize - The maximum size in bytes (default: 1MB).
 * @param fallback - The fallback value if the body exceeds the limit (default: null).
 * @returns The body if within limit, otherwise fallback.
 */
export function bodySizeLimit<T>(
  body: T,
  maxSize: number = 1024 * 1024,
  fallback: T | null = null
): T | null {
  const bodyString = JSON.stringify(body);
  if (bodyString.length > maxSize) {
    return fallback;
  }
  return body;
}