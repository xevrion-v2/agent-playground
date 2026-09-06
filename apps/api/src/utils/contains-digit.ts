export function containsDigit(value: string): boolean {
  for (const ch of value) {
    if (ch >= "0" && ch <= "9") return true;
  }
  return false;
}
