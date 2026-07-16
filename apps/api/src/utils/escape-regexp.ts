/**
 * Escapes all regular expression metacharacters in a string for safe
 * construction of a new RegExp object.
 *
 * @param str - The string to escape.
 * @returns A string with all regex metacharacters escaped.
 *
 * @example
 * ```ts
 * escapeRegExp('what is the $limit?')
 * //=> 'what is the \\$limit?'
 *
 * escapeRegExp('Change my eyes .css([\\w])')
 * //=> 'Change my eyes \\.[css]\\(\\[\\\\w\\]\\)'
 * ```
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
