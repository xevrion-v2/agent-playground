export function mergeDefined<T extends object>(
  target: T,
  patch: Partial<T>,
): T {
  const result = { ...target };

  for (const [key, value] of Object.entries(patch) as Array<
    [keyof T, T[keyof T] | undefined]
  >) {
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
