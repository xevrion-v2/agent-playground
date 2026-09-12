/**
 * Array utility functions for API data processing.
 * Provides common array manipulation helpers.
 */

/**
 * Removes duplicate values from an array.
 *
 * @param arr - The input array
 * @returns A new array with duplicates removed
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 * unique(["a", "b", "a", "c"]) // ["a", "b", "c"]
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
}

/**
 * Removes duplicate objects from an array based on a key.
 *
 * @param arr - The input array
 * @param key - The key to use for deduplication
 * @returns A new array with duplicates removed
 *
 * @example
 * ```ts
 * uniqueBy([{id: 1}, {id: 2}, {id: 1}], "id") // [{id: 1}, {id: 2}]
 * ```
 */
export function uniqueBy<T extends Record<string, unknown>>(arr: T[], key: string): T[] {
  if (!Array.isArray(arr) || !key) return [];
  const seen = new Set<unknown>();
  return arr.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

/**
 * Flattens a nested array by one level.
 *
 * @param arr - The input array
 * @returns A new flattened array
 *
 * @example
 * ```ts
 * flatten([1, [2, 3], [4, [5, 6]]]) // [1, 2, 3, 4, [5, 6]]
 * ```
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  if (!Array.isArray(arr)) return [];
  return arr.flat() as T[];
}

/**
 * Flattens a nested array completely.
 *
 * @param arr - The input array
 * @returns A new completely flattened array
 *
 * @example
 * ```ts
 * flattenDeep([1, [2, 3], [4, [5, 6]]]) // [1, 2, 3, 4, 5, 6]
 * ```
 */
export function flattenDeep<T>(arr: unknown[]): T[] {
  if (!Array.isArray(arr)) return [];
  return arr.flat(Infinity) as T[];
}

/**
 * Chunks an array into smaller arrays of a specified size.
 *
 * @param arr - The input array
 * @param size - The size of each chunk
 * @returns An array of chunks
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4], 3) // [[1, 2, 3], [4]]
 * ```
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Array.isArray(arr) || size <= 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Groups array elements by a key.
 *
 * @param arr - The input array
 * @param key - The key to group by (string or function)
 * @returns An object with groups
 *
 * @example
 * ```ts
 * groupBy([{type: "a", val: 1}, {type: "b", val: 2}, {type: "a", val: 3}], "type")
 * // { a: [{type: "a", val: 1}, {type: "a", val: 3}], b: [{type: "b", val: 2}] }
 *
 * groupBy([1.2, 2.5, 3.7], Math.floor)
 * // { 1: [1.2], 2: [2.5], 3: [3.7] }
 * ```
 */
export function groupBy<T>(
  arr: T[],
  key: string | ((item: T) => string),
): Record<string, T[]> {
  if (!Array.isArray(arr)) return {};
  return arr.reduce((acc, item) => {
    const groupKey = typeof key === "function" ? key(item) : String((item as Record<string, unknown>)[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Sorts an array of objects by a key.
 *
 * @param arr - The input array
 * @param key - The key to sort by
 * @param order - The sort order ("asc" or "desc", default: "asc")
 * @returns A new sorted array
 *
 * @example
 * ```ts
 * sortBy([{name: "b", age: 30}, {name: "a", age: 25}], "name")
 * // [{name: "a", age: 25}, {name: "b", age: 30}]
 *
 * sortBy([{age: 30}, {age: 25}], "age", "desc")
 * // [{age: 30}, {age: 25}]
 * ```
 */
export function sortBy<T extends Record<string, unknown>>(
  arr: T[],
  key: string,
  order: "asc" | "desc" = "asc",
): T[] {
  if (!Array.isArray(arr) || !key) return [];
  const sorted = [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  });
  return order === "desc" ? sorted.reverse() : sorted;
}

/**
 * Returns the first n elements of an array.
 *
 * @param arr - The input array
 * @param n - The number of elements to return (default: 1)
 * @returns A new array with the first n elements
 *
 * @example
 * ```ts
 * take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
 * take([1, 2, 3]) // [1]
 * ```
 */
export function take<T>(arr: T[], n = 1): T[] {
  if (!Array.isArray(arr) || n <= 0) return [];
  return arr.slice(0, n);
}

/**
 * Returns the last n elements of an array.
 *
 * @param arr - The input array
 * @param n - The number of elements to return (default: 1)
 * @returns A new array with the last n elements
 *
 * @example
 * ```ts
 * takeRight([1, 2, 3, 4, 5], 3) // [3, 4, 5]
 * takeRight([1, 2, 3]) // [3]
 * ```
 */
export function takeRight<T>(arr: T[], n = 1): T[] {
  if (!Array.isArray(arr) || n <= 0) return [];
  return arr.slice(Math.max(arr.length - n, 0));
}

/**
 * Removes falsy values (false, null, 0, "", undefined, NaN) from an array.
 *
 * @param arr - The input array
 * @returns A new array with falsy values removed
 *
 * @example
 * ```ts
 * compact([0, 1, false, 2, "", 3, null, undefined, NaN]) // [1, 2, 3]
 * ```
 */
export function compact<T>(arr: (T | null | undefined | false | "" | 0)[]): T[] {
  if (!Array.isArray(arr)) return [];
  return arr.filter(Boolean) as T[];
}

/**
 * Returns the difference between two arrays.
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns A new array with elements in arr1 but not in arr2
 *
 * @example
 * ```ts
 * difference([1, 2, 3, 4], [2, 4]) // [1, 3]
 * difference(["a", "b", "c"], ["b"]) // ["a", "c"]
 * ```
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  const set = new Set(arr2);
  return arr1.filter((item) => !set.has(item));
}

/**
 * Returns the intersection of two arrays.
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns A new array with elements in both arrays
 *
 * @example
 * ```ts
 * intersection([1, 2, 3, 4], [2, 4, 5]) // [2, 4]
 * intersection(["a", "b", "c"], ["b", "c", "d"]) // ["b", "c"]
 * ```
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  const set = new Set(arr2);
  return arr1.filter((item) => set.has(item));
}

/**
 * Returns the union of two arrays (no duplicates).
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns A new array with all unique elements from both arrays
 *
 * @example
 * ```ts
 * union([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]
 * union(["a", "b"], ["b", "c"]) // ["a", "b", "c"]
 * ```
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return unique([...arr1, ...arr2]);
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 *
 * @param arr - The input array
 * @returns A new shuffled array
 *
 * @example
 * ```ts
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random order)
 * ```
 */
export function shuffle<T>(arr: T[]): T[] {
  if (!Array.isArray(arr)) return [];
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Samples n random elements from an array.
 *
 * @param arr - The input array
 * @param n - The number of elements to sample (default: 1)
 * @returns A new array with n random elements
 *
 * @example
 * ```ts
 * sample([1, 2, 3, 4, 5], 2) // [3, 1] (random)
 * sample([1, 2, 3]) // [2] (random)
 * ```
 */
export function sample<T>(arr: T[], n = 1): T[] {
  if (!Array.isArray(arr) || n <= 0) return [];
  if (n >= arr.length) return shuffle(arr);
  return shuffle(arr).slice(0, n);
}

/**
 * Returns the sum of all numbers in an array.
 *
 * @param arr - The input array of numbers
 * @returns The sum of all numbers
 *
 * @example
 * ```ts
 * sum([1, 2, 3, 4, 5]) // 15
 * sum([]) // 0
 * ```
 */
export function sum(arr: number[]): number {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((acc, val) => acc + (typeof val === "number" ? val : 0), 0);
}

/**
 * Returns the average of all numbers in an array.
 *
 * @param arr - The input array of numbers
 * @returns The average of all numbers
 *
 * @example
 * ```ts
 * average([1, 2, 3, 4, 5]) // 3
 * average([]) // 0
 * ```
 */
export function average(arr: number[]): number {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/**
 * Returns the maximum value in an array.
 *
 * @param arr - The input array of numbers
 * @returns The maximum value, or undefined if the array is empty
 *
 * @example
 * ```ts
 * max([1, 2, 3, 4, 5]) // 5
 * max([]) // undefined
 * ```
 */
export function max(arr: number[]): number | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return Math.max(...arr.filter((v) => typeof v === "number"));
}

/**
 * Returns the minimum value in an array.
 *
 * @param arr - The input array of numbers
 * @returns The minimum value, or undefined if the array is empty
 *
 * @example
 * ```ts
 * min([1, 2, 3, 4, 5]) // 1
 * min([]) // undefined
 * ```
 */
export function min(arr: number[]): number | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return Math.min(...arr.filter((v) => typeof v === "number"));
}

/**
 * Counts the occurrences of each value in an array.
 *
 * @param arr - The input array
 * @returns An object with value counts
 *
 * @example
 * ```ts
 * countBy([1, 2, 2, 3, 3, 3]) // { "1": 1, "2": 2, "3": 3 }
 * countBy(["a", "b", "a", "c", "a"]) // { "a": 3, "b": 1, "c": 1 }
 * ```
 */
export function countBy<T>(arr: T[]): Record<string, number> {
  if (!Array.isArray(arr)) return {};
  return arr.reduce((acc, item) => {
    const key = String(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Partitions an array into two arrays based on a predicate.
 *
 * @param arr - The input array
 * @param predicate - The predicate function
 * @returns A tuple of [matching, non-matching] arrays
 *
 * @example
 * ```ts
 * partition([1, 2, 3, 4, 5], (n) => n % 2 === 0)
 * // [[2, 4], [1, 3, 5]]
 * ```
 */
export function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  if (!Array.isArray(arr) || typeof predicate !== "function") return [[], []];
  const matching: T[] = [];
  const nonMatching: T[] = [];
  for (const item of arr) {
    if (predicate(item)) {
      matching.push(item);
    } else {
      nonMatching.push(item);
    }
  }
  return [matching, nonMatching];
}

/**
 * Zips two arrays into an array of tuples.
 *
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns An array of tuples
 *
 * @example
 * ```ts
 * zip([1, 2, 3], ["a", "b", "c"]) // [[1, "a"], [2, "b"], [3, "c"]]
 * zip([1, 2], ["a", "b", "c"]) // [[1, "a"], [2, "b"]]
 * ```
 */
export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

/**
 * Unzips an array of tuples into two arrays.
 *
 * @param arr - The input array of tuples
 * @returns A tuple of two arrays
 *
 * @example
 * ```ts
 * unzip([[1, "a"], [2, "b"], [3, "c"]]) // [[1, 2, 3], ["a", "b", "c"]]
 * ```
 */
export function unzip<T, U>(arr: [T, U][]): [T[], U[]] {
  if (!Array.isArray(arr)) return [[], []];
  const arr1: T[] = [];
  const arr2: U[] = [];
  for (const [item1, item2] of arr) {
    arr1.push(item1);
    arr2.push(item2);
  }
  return [arr1, arr2];
}

/**
 * Returns a random element from an array.
 *
 * @param arr - The input array
 * @returns A random element, or undefined if the array is empty
 *
 * @example
 * ```ts
 * random([1, 2, 3, 4, 5]) // 3 (random)
 * random([]) // undefined
 * ```
 */
export function random<T>(arr: T[]): T | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Checks if an array is empty.
 *
 * @param arr - The input array
 * @returns True if the array is empty, false otherwise
 *
 * @example
 * ```ts
 * isEmpty([]) // true
 * isEmpty([1, 2, 3]) // false
 * ```
 */
export function isEmpty(arr: unknown[]): boolean {
  return !Array.isArray(arr) || arr.length === 0;
}

/**
 * Checks if an array is not empty.
 *
 * @param arr - The input array
 * @returns True if the array is not empty, false otherwise
 *
 * @example
 * ```ts
 * isNotEmpty([1, 2, 3]) // true
 * isNotEmpty([]) // false
 * ```
 */
export function isNotEmpty(arr: unknown[]): boolean {
  return Array.isArray(arr) && arr.length > 0;
}

export default {
  unique,
  uniqueBy,
  flatten,
  flattenDeep,
  chunk,
  groupBy,
  sortBy,
  take,
  takeRight,
  compact,
  difference,
  intersection,
  union,
  shuffle,
  sample,
  sum,
  average,
  max,
  min,
  countBy,
  partition,
  zip,
  unzip,
  random,
  isEmpty,
  isNotEmpty,
};
