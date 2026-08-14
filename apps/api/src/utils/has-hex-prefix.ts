export function hasHexPrefix(value: string): boolean {
  return value.includes("0x") || value.includes("0X");
}
