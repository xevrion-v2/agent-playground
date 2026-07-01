export function redactSecret(value: string, visiblePrefix = 4): string {
  if (value.length <= visiblePrefix) {
    return "*".repeat(value.length);
  }
  return `${value.slice(0, visiblePrefix)}${"*".repeat(Math.max(0, value.length - visiblePrefix))}`;
}
