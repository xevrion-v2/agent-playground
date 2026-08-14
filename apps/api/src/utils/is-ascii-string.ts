export function isAsciiString(value: string): boolean {
  for (let i = 0; i < value.length; i += 1) {
    if (value.charCodeAt(i) > 127) return false;
  }
  return true;
}
