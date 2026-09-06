const CJK_RADICAL_C_SIMPLIFIED_BIRD = "\u2ee6";

export function $fn(input: string): boolean {
  return input.includes(CJK_RADICAL_C_SIMPLIFIED_BIRD);
}

