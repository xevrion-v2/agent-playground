export function startsWithUppercase(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  const code = value.charCodeAt(0);
  return code >= 0x41 && code <= 0x5a;
}
