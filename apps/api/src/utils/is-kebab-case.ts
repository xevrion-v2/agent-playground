const KEBAB_CASE_PATTERN = /^[a-z]+(?:-[a-z]+)*$/;

export function isKebabCase(value: string): boolean {
  return KEBAB_CASE_PATTERN.test(value);
}
