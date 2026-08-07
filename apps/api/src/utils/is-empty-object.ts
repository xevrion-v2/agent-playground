export function isEmptyObject(value: unknown): value is Record<PropertyKey, never> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    return false;
  }

  return Reflect.ownKeys(value).length === 0;
}
