const POP_DIRECTIONAL_ISOLATE = "\u2069";

export function isPopDirectionalIsolatePresent(input: string): boolean {
  return input.includes(POP_DIRECTIONAL_ISOLATE);
}
