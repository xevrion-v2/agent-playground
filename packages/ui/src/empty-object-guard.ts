export function isEmptyObject(value: unknown): value is Record<string, never> {
  return typeof value === 'object' && value !== null && Object.keys(value).length === 0;
}
