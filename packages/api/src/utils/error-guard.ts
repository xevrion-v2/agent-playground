/**
 * Safely wraps a function with error handling.
 * @param fn - The function to execute.
 * @param fallback - The fallback value if an error occurs.
 * @returns The result of the function or the fallback.
 */
export function errorGuard<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/**
 * Safely wraps an async function with error handling.
 * @param fn - The async function to execute.
 * @param fallback - The fallback value if an error occurs.
 * @returns The result of the function or the fallback.
 */
export async function errorGuardAsync<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}