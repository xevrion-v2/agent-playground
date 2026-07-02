export function startsWithUppercase(value: string): boolean {
  return value.length > 0 && value[0] >= "A" && value[0] <= "Z";
}
