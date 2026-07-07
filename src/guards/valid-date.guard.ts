export function isValidDate(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (value instanceof Date) return !isNaN(value.getTime());
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.toString() !== 'Invalid Date';
  }
  return false;
}

export function safeParseDate(value: unknown): Date | null {
  return isValidDate(value) ? new Date(value as string | number | Date) : null;
}
