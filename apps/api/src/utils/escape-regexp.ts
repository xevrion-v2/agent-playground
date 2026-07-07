/**
 * Escape special regex characters in a string.
 * 
 * Examples:
 *   escapeRegExp("hello.world")     → "hello\.world"
 *   escapeRegExp("$100 & 200%")     → "\$100 & 200%"
 *   escapeRegExp("[a-z]+")          → "\[a-z\]\+"
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
