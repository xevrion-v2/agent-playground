export function endsWithLowercase(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  const code = value.charCodeAt(value.length - 1);
  return code >= 0x61 && code <= 0x7a;
}
