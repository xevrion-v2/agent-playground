/**
 * Safely wraps an async function with error handling.
 * @param fn - The async function to execute.
 * @param fallback - The fallback value if an error occurs.
 * @returns The result of the function or the fallback.
 */
export async function errorGuard<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

/**
 * Safely wraps a synchronous function with error handling.
 * @param fn - The synchronous function to execute.
 * @param fallback - The fallback value if an error occurs.
 * @returns The result of the function or the fallback.
 */
export function errorGuardSync<T>(
  fn: () => T,
  fallback: T
): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}