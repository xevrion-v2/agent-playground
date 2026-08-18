export async function guardPromise<T>(
  promise: Promise<T>
): Promise<[Error | null, T | null]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
}

export function guardSync<T>(fn: () => T): [Error | null, T | null] {
  try {
    const result = fn();
    return [null, result];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
}
