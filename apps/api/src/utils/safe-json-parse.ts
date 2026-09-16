/**
 * Safely parses JSON, returning null on failure.
 * @module utils/safe-json-parse
 */
export function safeJsonParse<T = unknown>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
