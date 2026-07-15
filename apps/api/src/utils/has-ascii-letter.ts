export function hasAsciiLetter(value: string): boolean {
  for (const ch of value) {
    if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) return true;
  }
  return false;
}
