export function parseDate(value: unknown): Date | undefined {
  if (value instanceof Date) {
    return cloneIfValid(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return undefined;
    }

    return cloneIfValid(new Date(value));
  }

  if (typeof value === "string") {
    return cloneIfValid(new Date(value));
  }

  return undefined;
}

function cloneIfValid(date: Date): Date | undefined {
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Date(date.getTime());
}
