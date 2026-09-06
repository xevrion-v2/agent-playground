export function isValidDate(value: Date): boolean {
  return !Number.isNaN(value.getTime());
}
