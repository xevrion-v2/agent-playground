export function capitalizeFirst(value: string): string {
  return value.length === 0 ? "" : value.charAt(0).toUpperCase() + value.slice(1);
}
