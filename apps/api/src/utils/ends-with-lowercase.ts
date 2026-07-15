export function endsWithLowercase(value: string): boolean {
  if (value.length === 0) return false;
  const ch = value[value.length - 1];
  return ch >= "a" && ch <= "z";
}
