export function startsWithLowercase(value: string): boolean {
  return value.length > 0 && value[0] >= "a" && value[0] <= "z";
}
