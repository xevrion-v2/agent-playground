export function coerceNumber(value: unknown, fallback: number): number {
  if (!Number.isFinite(fallback)) {
    throw new RangeError("fallback must be a finite number");
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}
