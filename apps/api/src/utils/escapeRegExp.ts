const REGEXP_SPECIAL_CHARS = /[\\^$.*+?()[\]{}|]/g;

export function escapeRegExp(value: string): string {
  return value.replace(REGEXP_SPECIAL_CHARS, "\\$&");
}
