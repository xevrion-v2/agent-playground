const PASCAL_CASE_PATTERN = /^(?:[A-Z][a-z0-9]*)+$/;

export function isPascalCase(value: string): boolean {
  return PASCAL_CASE_PATTERN.test(value);
}
