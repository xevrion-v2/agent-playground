const HYPHEN_BULLET = "\u2043";

export function isHyphenBulletPresent(input: string): boolean {
  return input.includes(HYPHEN_BULLET);
}
