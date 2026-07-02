export function hasAtSymbolCharacter(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  return value.includes('@');
}
