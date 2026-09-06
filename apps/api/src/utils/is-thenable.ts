export function isThenable(value: unknown): value is PromiseLike<unknown> {
  if (typeof value !== "object" && typeof value !== "function") {
    return false;
  }

  if (value === null) {
    return false;
  }

  return typeof (value as { then?: unknown }).then === "function";
}
