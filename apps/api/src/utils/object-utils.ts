/**
 * Object utility functions for API data processing.
 * Provides common object manipulation helpers.
 */

/**
 * Picks specific keys from an object.
 *
 * @param obj - The source object
 * @param keys - The keys to pick
 * @returns A new object with only the specified keys
 *
 * @example
 * ```ts
 * pick({a: 1, b: 2, c: 3}, ["a", "c"]) // {a: 1, c: 3}
 * pick({a: 1, b: 2}, ["x"]) // {}
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  if (!obj || typeof obj !== "object" || !Array.isArray(keys)) return {} as Pick<T, K>;
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specific keys from an object.
 *
 * @param obj - The source object
 * @param keys - The keys to omit
 * @returns A new object without the specified keys
 *
 * @example
 * ```ts
 * omit({a: 1, b: 2, c: 3}, ["b"]) // {a: 1, c: 3}
 * omit({a: 1, b: 2}, ["x"]) // {a: 1, b: 2}
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  if (!obj || typeof obj !== "object" || !Array.isArray(keys)) return {} as Omit<T, K>;
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Gets a nested value from an object using a dot-separated path.
 *
 * @param obj - The source object
 * @param path - The dot-separated path (e.g., "a.b.c")
 * @param defaultValue - The default value to return if the path doesn't exist
 * @returns The value at the path, or the default value
 *
 * @example
 * ```ts
 * get({a: {b: {c: 1}}}, "a.b.c") // 1
 * get({a: {b: {c: 1}}}, "a.x.y", "default") // "default"
 * get({a: {b: [1, 2, 3]}}, "a.b.1") // 2
 * ```
 */
export function get<T>(
  obj: Record<string, unknown> | null | undefined,
  path: string,
  defaultValue?: T,
): T | undefined {
  if (!obj || typeof obj !== "object" || !path) return defaultValue;

  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return defaultValue;
    if (typeof current === "object") {
      current = (current as Record<string, unknown>)[key];
    } else {
      return defaultValue;
    }
  }

  return (current as T) ?? defaultValue;
}

/**
 * Sets a nested value in an object using a dot-separated path.
 *
 * @param obj - The target object
 * @param path - The dot-separated path (e.g., "a.b.c")
 * @param value - The value to set
 * @returns The modified object
 *
 * @example
 * ```ts
 * set({}, "a.b.c", 1) // {a: {b: {c: 1}}}
 * set({a: {b: 1}}, "a.c", 2) // {a: {b: 1, c: 2}}
 * ```
 */
export function set<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown,
): T {
  if (!obj || typeof obj !== "object" || !path) return obj;

  const keys = path.split(".");
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
  return obj;
}

/**
 * Checks if an object has a specific key.
 *
 * @param obj - The object to check
 * @param key - The key to check for
 * @returns True if the object has the key, false otherwise
 *
 * @example
 * ```ts
 * has({a: 1, b: 2}, "a") // true
 * has({a: 1, b: 2}, "c") // false
 * has(null, "a") // false
 * ```
 */
export function has(obj: Record<string, unknown> | null | undefined, key: string): boolean {
  if (!obj || typeof obj !== "object") return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Gets the keys of an object.
 *
 * @param obj - The object
 * @returns An array of keys
 *
 * @example
 * ```ts
 * keys({a: 1, b: 2, c: 3}) // ["a", "b", "c"]
 * keys({}) // []
 * ```
 */
export function keys(obj: Record<string, unknown> | null | undefined): string[] {
  if (!obj || typeof obj !== "object") return [];
  return Object.keys(obj);
}

/**
 * Gets the values of an object.
 *
 * @param obj - The object
 * @returns An array of values
 *
 * @example
 * ```ts
 * values({a: 1, b: 2, c: 3}) // [1, 2, 3]
 * values({}) // []
 * ```
 */
export function values<T>(obj: Record<string, T> | null | undefined): T[] {
  if (!obj || typeof obj !== "object") return [];
  return Object.values(obj);
}

/**
 * Gets the entries (key-value pairs) of an object.
 *
 * @param obj - The object
 * @returns An array of [key, value] pairs
 *
 * @example
 * ```ts
 * entries({a: 1, b: 2}) // [["a", 1], ["b", 2]]
 * entries({}) // []
 * ```
 */
export function entries<T>(obj: Record<string, T> | null | undefined): [string, T][] {
  if (!obj || typeof obj !== "object") return [];
  return Object.entries(obj);
}

/**
 * Checks if an object is empty (has no own enumerable properties).
 *
 * @param obj - The object to check
 * @returns True if the object is empty, false otherwise
 *
 * @example
 * ```ts
 * isEmpty({}) // true
 * isEmpty({a: 1}) // false
 * isEmpty(null) // true
 * ```
 */
export function isEmpty(obj: Record<string, unknown> | null | undefined): boolean {
  if (!obj || typeof obj !== "object") return true;
  return Object.keys(obj).length === 0;
}

/**
 * Checks if an object is not empty.
 *
 * @param obj - The object to check
 * @returns True if the object is not empty, false otherwise
 *
 * @example
 * ```ts
 * isNotEmpty({a: 1}) // true
 * isNotEmpty({}) // false
 * ```
 */
export function isNotEmpty(obj: Record<string, unknown> | null | undefined): boolean {
  return !isEmpty(obj);
}

/**
 * Gets the number of keys in an object.
 *
 * @param obj - The object
 * @returns The number of keys
 *
 * @example
 * ```ts
 * size({a: 1, b: 2, c: 3}) // 3
 * size({}) // 0
 * ```
 */
export function size(obj: Record<string, unknown> | null | undefined): number {
  if (!obj || typeof obj !== "object") return 0;
  return Object.keys(obj).length;
}

/**
 * Merges two objects deeply.
 *
 * @param target - The target object
 * @param source - The source object
 * @returns The merged object
 *
 * @example
 * ```ts
 * merge({a: {b: 1}}, {a: {c: 2}}) // {a: {b: 1, c: 2}}
 * merge({a: 1}, {b: 2}) // {a: 1, b: 2}
 * merge({a: 1}, {a: 2}) // {a: 2}
 * ```
 */
export function merge<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>,
): T {
  if (!target || typeof target !== "object") return target;
  if (!source || typeof source !== "object") return target;

  for (const key of Object.keys(source)) {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (
      targetValue &&
      sourceValue &&
      typeof targetValue === "object" &&
      typeof sourceValue === "object" &&
      !Array.isArray(targetValue) &&
      !Array.isArray(sourceValue)
    ) {
      target[key] = merge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>,
      );
    } else {
      target[key] = sourceValue;
    }
  }

  return target;
}

/**
 * Creates a deep clone of an object.
 *
 * @param obj - The object to clone
 * @returns A deep clone of the object
 *
 * @example
 * ```ts
 * const original = {a: {b: 1}};
 * const cloned = cloneDeep(original);
 * cloned.a.b = 2;
 * original.a.b // 1 (unchanged)
 * ```
 */
export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => cloneDeep(item)) as unknown as T;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof RegExp) return new RegExp(obj) as unknown as T;

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    result[key] = cloneDeep((obj as Record<string, unknown>)[key]);
  }
  return result as T;
}

/**
 * Maps object values using a function.
 *
 * @param obj - The source object
 * @param fn - The mapping function
 * @returns A new object with mapped values
 *
 * @example
 * ```ts
 * mapValues({a: 1, b: 2}, (v) => v * 2) // {a: 2, b: 4}
 * mapValues({a: "hello", b: "world"}, (v) => v.toUpperCase()) // {a: "HELLO", b: "WORLD"}
 * ```
 */
export function mapValues<T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => U,
): Record<string, U> {
  if (!obj || typeof obj !== "object" || typeof fn !== "function") return {};
  const result: Record<string, U> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value, key);
  }
  return result;
}

/**
 * Maps object keys using a function.
 *
 * @param obj - The source object
 * @param fn - The key mapping function
 * @returns A new object with mapped keys
 *
 * @example
 * ```ts
 * mapKeys({a: 1, b: 2}, (k) => k.toUpperCase()) // {A: 1, B: 2}
 * mapKeys({name: "Alice", age: 30}, (k) => `user_${k}`) // {user_name: "Alice", user_age: 30}
 * ```
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  fn: (key: string, value: T) => string,
): Record<string, T> {
  if (!obj || typeof obj !== "object" || typeof fn !== "function") return {};
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[fn(key, value)] = value;
  }
  return result;
}

/**
 * Filters object entries using a predicate function.
 *
 * @param obj - The source object
 * @param predicate - The predicate function
 * @returns A new object with filtered entries
 *
 * @example
 * ```ts
 * filterObject({a: 1, b: 2, c: 3}, (v) => v > 1) // {b: 2, c: 3}
 * filterObject({a: 1, b: 2, c: 3}, (_v, k) => k !== "b") // {a: 1, c: 3}
 * ```
 */
export function filterObject<T>(
  obj: Record<string, T>,
  predicate: (value: T, key: string) => boolean,
): Record<string, T> {
  if (!obj || typeof obj !== "object" || typeof predicate !== "function") return {};
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Inverts an object's keys and values.
 *
 * @param obj - The source object
 * @returns A new object with inverted keys and values
 *
 * @example
 * ```ts
 * invert({a: "1", b: "2"}) // {"1": "a", "2": "b"}
 * invert({name: "Alice", age: "30"}) // {Alice: "name", "30": "age"}
 * ```
 */
export function invert(obj: Record<string, string>): Record<string, string> {
  if (!obj || typeof obj !== "object") return {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[String(value)] = key;
  }
  return result;
}

/**
 * Finds the key of the first entry that satisfies the predicate.
 *
 * @param obj - The source object
 * @param predicate - The predicate function
 * @returns The key of the first matching entry, or undefined
 *
 * @example
 * ```ts
 * findKey({a: 1, b: 2, c: 3}, (v) => v > 1) // "b"
 * findKey({a: 1, b: 2}, (v) => v > 5) // undefined
 * ```
 */
export function findKey<T>(
  obj: Record<string, T>,
  predicate: (value: T, key: string) => boolean,
): string | undefined {
  if (!obj || typeof obj !== "object" || typeof predicate !== "function") return undefined;
  for (const [key, value] of Object.entries(obj)) {
    if (predicate(value, key)) {
      return key;
    }
  }
  return undefined;
}

/**
 * Checks if two objects are deeply equal.
 *
 * @param obj1 - The first object
 * @param obj2 - The second object
 * @returns True if the objects are deeply equal, false otherwise
 *
 * @example
 * ```ts
 * isEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}}) // true
 * isEqual({a: 1}, {a: 2}) // false
 * isEqual({a: 1}, {b: 1}) // false
 * ```
 */
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null) return false;
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

  const keys1 = Object.keys(obj1 as Record<string, unknown>);
  const keys2 = Object.keys(obj2 as Record<string, unknown>);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
    if (!isEqual((obj1 as Record<string, unknown>)[key], (obj2 as Record<string, unknown>)[key])) {
      return false;
    }
  }

  return true;
}

/**
 * Converts an object to a query string.
 *
 * @param obj - The object to convert
 * @returns The query string
 *
 * @example
 * ```ts
 * toQueryString({a: 1, b: "hello"}) // "a=1&b=hello"
 * toQueryString({a: 1, b: [2, 3]}) // "a=1&b=2&b=3"
 * toQueryString({}) // ""
 * ```
 */
export function toQueryString(obj: Record<string, unknown>): string {
  if (!obj || typeof obj !== "object") return "";
  const params: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
      }
    } else {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }
  return params.join("&");
}

/**
 * Renames keys in an object.
 *
 * @param obj - The source object
 * @param keyMap - A map of old keys to new keys
 * @returns A new object with renamed keys
 *
 * @example
 * ```ts
 * renameKeys({a: 1, b: 2}, {a: "x", b: "y"}) // {x: 1, y: 2}
 * renameKeys({name: "Alice", age: 30}, {name: "firstName"}) // {firstName: "Alice", age: 30}
 * ```
 */
export function renameKeys<T extends Record<string, unknown>>(
  obj: T,
  keyMap: Record<string, string>,
): Record<string, unknown> {
  if (!obj || typeof obj !== "object" || !keyMap) return obj;
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = keyMap[key] ?? key;
    result[newKey] = value;
  }
  return result;
}

export default {
  pick,
  omit,
  get,
  set,
  has,
  keys,
  values,
  entries,
  isEmpty,
  isNotEmpty,
  size,
  merge,
  cloneDeep,
  mapValues,
  mapKeys,
  filterObject,
  invert,
  findKey,
  isEqual,
  toQueryString,
  renameKeys,
};
