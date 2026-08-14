export function isSnakeCase(value: string): boolean {
  return /^[a-z0-9]+(?:_[a-z0-9]+)*$/.test(value);
}
