export function startsWithLowercase(value: string): boolean {
  if (!value) return false;
  const first = value.charCodeAt(0);
  return first >= 97 && first <= 122;
}
