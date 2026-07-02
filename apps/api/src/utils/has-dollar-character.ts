export function hasDollarCharacter(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  return value.includes('$');
}
