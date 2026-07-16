```typescript
// apps/api/src/utils/is-hiragana-letter-small-wa-present.ts

/**
 * Checks if the input string contains the Unicode Hiragana letter small WA (U+308E).
 *
 * @param {string} input - The string to check.
 * @returns {boolean} - True if the string contains the small WA character, false otherwise.
 */
export function isHiraganaLetterSmallWaPresent(input: string): boolean {
  // Regular expression to match the Hiragana letter small WA (U+308E)
  const regex = /[\u308E]/;

  // Test if the input string contains the small WA character
  return regex.test(input);
}

// Example usage:
const testString1 = "こんにちは";
const testString2 = "こんにちはわ";

console.log(isHiraganaLetterSmallWaPresent(testString1)); // Output: false
console.log(isHiraganaLetterSmallWaPresent(testString2)); // Output: true
```