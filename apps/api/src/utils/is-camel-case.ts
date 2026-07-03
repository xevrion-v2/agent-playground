const CAMEL_CASE_PATTERN = /^[a-z][a-z0-9]*(?:[A-Z][a-z0-9]*)*$/;

export function isCamelCase(value: string): boolean {
  return CAMEL_CASE_PATTERN.test(value);
}
