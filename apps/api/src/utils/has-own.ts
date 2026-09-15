export function hasOwn<K extends PropertyKey>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  const type = typeof value;

  if ((type !== "object" && type !== "function") || value === null) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(value, key);
}
