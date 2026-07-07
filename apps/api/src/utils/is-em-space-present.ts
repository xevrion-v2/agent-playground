const EM_SPACE = "\u2003";

export function isEmSpacePresent(value: string): boolean {
  return value.includes(EM_SPACE);
}
