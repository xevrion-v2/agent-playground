export function $fn(input: string): boolean {
  return input.includes("\u2F47");
}

export const isKangxiRadicalSunPresent = $fn;
