export function endsWithLowercase(value: string): boolean {
  if (value.length === 0) return false;
  const last = value[value.length - 1];
  return last >= 'a' && last <= 'z';
}
