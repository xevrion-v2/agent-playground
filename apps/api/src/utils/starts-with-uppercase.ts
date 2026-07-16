export function startsWithUppercase(value: string): boolean {
  if (!value) return false;
  const first = value.charCodeAt(0);
  return first >= 65 && first <= 90;
}
