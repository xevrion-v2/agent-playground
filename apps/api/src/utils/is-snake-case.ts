const SNAKE_CASE_PATTERN = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;

export function isSnakeCase(value: string): boolean {
  return SNAKE_CASE_PATTERN.test(value);
}
