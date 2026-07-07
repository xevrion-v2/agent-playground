export function isEmptyObject(value: Record<PropertyKey, unknown>): boolean {
  return Object.keys(value).length === 0;
}
