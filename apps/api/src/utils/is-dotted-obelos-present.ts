const DOTTED_OBELOS = "\u2e13";

export function isDottedObelosPresent(input: string): boolean {
  return input.includes(DOTTED_OBELOS);
}
