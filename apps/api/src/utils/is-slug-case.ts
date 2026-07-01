const SLUG_CASE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSlugCase(value: string): boolean {
  return SLUG_CASE_PATTERN.test(value);
}
