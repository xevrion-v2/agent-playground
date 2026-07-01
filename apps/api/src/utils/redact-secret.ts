export function redactSecret(value: string, visiblePrefix = 4): string {
  if (!Number.isInteger(visiblePrefix) || visiblePrefix < 0) {
    throw new RangeError("visiblePrefix must be a non-negative integer");
  }

  if (value.length <= visiblePrefix) {
    return value;
  }

  return `${value.slice(0, visiblePrefix)}${"*".repeat(value.length - visiblePrefix)}`;
}
