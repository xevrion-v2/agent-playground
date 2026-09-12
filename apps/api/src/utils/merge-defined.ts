export function mergeDefined<T extends Record<string, unknown>>(
  target: T,
  patch: Partial<T>,
): T {
  return {
    ...target,
    ...Object.fromEntries(
      Object.entries(patch).filter(([, value]) => value !== undefined),
    ),
  } as T;
}