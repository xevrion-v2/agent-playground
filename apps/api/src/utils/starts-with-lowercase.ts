export function startsWithLowercase(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  const code = value.charCodeAt(0);
  return code >= 0x61 && code <= 0x7a;
}
