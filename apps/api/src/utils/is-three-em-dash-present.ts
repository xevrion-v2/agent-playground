const THREE_EM_DASH = "\u2e3b";

export function isThreeEmDashPresent(input: string): boolean {
  return input.includes(THREE_EM_DASH);
}
