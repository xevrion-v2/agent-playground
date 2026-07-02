export function endsWithUppercase(value: string): boolean {
  if (value.length === 0) return false;
  const ch = value[value.length - 1];
  return ch >= "A" && ch <= "Z";
}
