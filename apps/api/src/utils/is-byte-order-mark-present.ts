export function isByteOrderMarkPresent(input: string): boolean {
  return input.includes("\ufeff");
}