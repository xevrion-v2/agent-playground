export function parseDate(value: string | number | Date): Date | undefined {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}
