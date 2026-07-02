export function capitalizeWord(value: string): string {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "";
  }

  return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
}
