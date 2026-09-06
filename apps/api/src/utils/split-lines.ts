/**
 * Splits a string into an array of lines, trimming trailing empty
 * entries. Handles both LF and CRLF line endings.
 */
export function splitLines(value: string): string[] {
  return value.split(/\r?\n/).filter((_, index, arr) => {
    // Keep non-empty lines and the last line even if empty
    return index < arr.length - 1 || arr[index].length > 0;
  });
}
