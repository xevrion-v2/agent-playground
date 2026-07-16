export function endsWithUppercase(value: string): boolean {
  if (!value) return false;
  const last = value.charCodeAt(value.length - 1);
  return last >= 65 && last <= 90;
}
