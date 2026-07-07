const FIRST_STRONG_ISOLATE = "\u2068";

export function isFirstStrongIsolatePresent(input: string): boolean {
  return input.includes(FIRST_STRONG_ISOLATE);
}
