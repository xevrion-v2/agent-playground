export function isHiraganaLetterSmallYuPresent(input: string): boolean {
  return input.includes("\u3085");
}

export default isHiraganaLetterSmallYuPresent;
