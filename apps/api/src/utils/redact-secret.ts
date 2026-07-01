export function redactSecret(value: string, visiblePrefix = 4, mask = "***"): string {
  if (!Number.isInteger(visiblePrefix) || visiblePrefix < 0) {
    throw new RangeError("Visible prefix must be a non-negative integer.");
  }

  if (value.length === 0) {
    return "";
  }

  if (visiblePrefix === 0 || value.length <= visiblePrefix) {
    return mask;
  }

  return `${value.slice(0, visiblePrefix)}${mask}`;
}
