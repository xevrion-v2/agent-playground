```typescript
// apps/api/src/utils/is-hiragana-letter-small-wa-present.ts

/**
 * Checks if the input string contains the Unicode Hiragana letter small WA (U+308E).
 *
 * @param {string} input - The string to check.
 * @returns {boolean} - True if the string contains the Hiragana letter small WA, false otherwise.
 */
export function isHiraganaLetterSmallWaPresent(input: string): boolean {
  // Regular expression to match the Hiragana letter small WA (U+308E)
  const hiraganaSmallWaRegex = /[\u308E]/;

  // Test if the input contains the Hiragana letter small WA
  return hiraganaSmallWaRegex.test(input);
}

// Example usage:
// console.log(isHiraganaLetterSmallWaPresent("こんにちは")); // false
// console.log(isHiraganaLetterSmallWaPresent("はい、わかりました。")); // true
```