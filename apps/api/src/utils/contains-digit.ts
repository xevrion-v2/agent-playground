export function containsDigit(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0x30 && code <= 0x39) {
      return true;
    }
  }

  return false;
}
