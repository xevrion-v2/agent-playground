const POP_DIRECTIONAL_FORMATTING = "\u202c";

export function isPopDirectionalFormattingPresent(input: string): boolean {
  return input.includes(POP_DIRECTIONAL_FORMATTING);
}
