export function isEvenInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value % 2 === 0;
}
