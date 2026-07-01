export function isEmptyObject(value: unknown): value is Record<PropertyKey, never> {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype &&
    Reflect.ownKeys(value).length === 0
  );
}
