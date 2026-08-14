export function pluck<T, K extends keyof T>(values: readonly T[], key: K): T[K][] {
  return values.map((value) => value[key]);
}