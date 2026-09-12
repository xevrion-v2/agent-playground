/**
 * URLSearchParams-based query string builder helper.
 * Builds query strings while skipping empty values.
 */

/**
 * Options for building query strings.
 */
export interface BuildQueryStringOptions {
  /** Whether to skip undefined values (default: true) */
  skipUndefined?: boolean;
  /** Whether to skip null values (default: true) */
  skipNull?: boolean;
  /** Whether to skip empty strings (default: true) */
  skipEmptyString?: boolean;
  /** Whether to skip empty arrays (default: true) */
  skipEmptyArray?: boolean;
  /** Whether to skip false values (default: false) */
  skipFalse?: boolean;
  /** Whether to skip zero values (default: false) */
  skipZero?: boolean;
  /** Whether to include the leading '?' (default: false) */
  includeQuestionMark?: boolean;
  /** Array format: 'repeat' (key=1&key=2), 'brackets' (key[]=1&key[]=2), 'comma' (key=1,2), 'indices' (key[0]=1&key[1]=2) (default: 'repeat') */
  arrayFormat?: "repeat" | "brackets" | "comma" | "indices";
  /** Custom encoder function for values (default: encodeURIComponent) */
  encoder?: (value: string) => string;
  /** Custom key encoder function (default: encodeURIComponent) */
  keyEncoder?: (key: string) => string;
  /** Whether to sort keys alphabetically (default: false) */
  sortKeys?: boolean;
  /** Custom sort function for keys */
  sortFunction?: (a: string, b: string) => number;
  /** Maximum number of parameters (default: undefined, no limit) */
  maxParams?: number;
}

/**
 * Default options for building query strings.
 */
export const DEFAULT_BUILD_QUERY_STRING_OPTIONS: Required<Omit<BuildQueryStringOptions, "encoder" | "keyEncoder" | "sortFunction" | "maxParams">> & {
  encoder?: BuildQueryStringOptions["encoder"];
  keyEncoder?: BuildQueryStringOptions["keyEncoder"];
  sortFunction?: BuildQueryStringOptions["sortFunction"];
  maxParams?: number;
} = {
  skipUndefined: true,
  skipNull: true,
  skipEmptyString: true,
  skipEmptyArray: true,
  skipFalse: false,
  skipZero: false,
  includeQuestionMark: false,
  arrayFormat: "repeat",
  encoder: undefined,
  keyEncoder: undefined,
  sortKeys: false,
  sortFunction: undefined,
  maxParams: undefined,
};

/**
 * Query string parameters type.
 */
export type QueryParams = Record<string, string | number | boolean | null | undefined | string[] | number[]>;

/**
 * Checks if a value should be skipped based on options.
 */
function shouldSkipValue(
  value: unknown,
  opts: typeof DEFAULT_BUILD_QUERY_STRING_OPTIONS,
): boolean {
  if (opts.skipUndefined && value === undefined) {
    return true;
  }
  if (opts.skipNull && value === null) {
    return true;
  }
  if (opts.skipEmptyString && typeof value === "string" && value === "") {
    return true;
  }
  if (opts.skipEmptyArray && Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (opts.skipFalse && value === false) {
    return true;
  }
  if (opts.skipZero && value === 0) {
    return true;
  }
  return false;
}

/**
 * Converts a value to its string representation.
 */
function valueToString(value: string | number | boolean): string {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  return String(value);
}

/**
 * Builds a query string from a parameters object.
 *
 * @param params - The query parameters
 * @param options - Building options
 * @returns The query string
 *
 * @example
 * ```ts
 * buildQueryString({ a: 1, b: "hello" }) // "a=1&b=hello"
 * buildQueryString({ a: 1, b: undefined }) // "a=1" (undefined skipped)
 * buildQueryString({ a: 1, b: "" }) // "a=1" (empty string skipped)
 * buildQueryString({ a: [1, 2, 3] }) // "a=1&a=2&a=3"
 * buildQueryString({ a: [1, 2] }, { arrayFormat: "brackets" }) // "a[]=1&a[]=2"
 * buildQueryString({ a: [1, 2] }, { arrayFormat: "comma" }) // "a=1,2"
 * buildQueryString({ a: 1 }, { includeQuestionMark: true }) // "?a=1"
 * buildQueryString({ b: 2, a: 1 }, { sortKeys: true }) // "a=1&b=2"
 * buildQueryString({}) // ""
 * buildQueryString(null) // ""
 * ```
 */
export function buildQueryString(
  params: QueryParams | null | undefined,
  options: BuildQueryStringOptions = {},
): string {
  if (params === null || params === undefined) {
    return "";
  }

  if (typeof params !== "object" || Array.isArray(params)) {
    return "";
  }

  const opts = { ...DEFAULT_BUILD_QUERY_STRING_OPTIONS, ...options };
  const encoder = opts.encoder ?? encodeURIComponent;
  const keyEncoder = opts.keyEncoder ?? encodeURIComponent;

  const searchParams = new URLSearchParams();
  let paramCount = 0;

  // Get keys, optionally sorted
  let keys = Object.keys(params);
  if (opts.sortKeys) {
    if (opts.sortFunction) {
      keys = keys.sort(opts.sortFunction);
    } else {
      keys = keys.sort();
    }
  }

  for (const key of keys) {
    // Check max params limit
    if (opts.maxParams !== undefined && paramCount >= opts.maxParams) {
      break;
    }

    const value = params[key];

    // Skip values based on options
    if (shouldSkipValue(value, opts)) {
      continue;
    }

    const encodedKey = keyEncoder(key);

    // Handle arrays
    if (Array.isArray(value)) {
      const nonEmptyValues = value.filter((v) => !shouldSkipValue(v, opts));

      if (nonEmptyValues.length === 0 && opts.skipEmptyArray) {
        continue;
      }

      if (opts.arrayFormat === "comma") {
        const commaValue = nonEmptyValues.map((v) => encoder(valueToString(v as string | number | boolean))).join(",");
        searchParams.append(encodedKey, commaValue);
        paramCount++;
      } else if (opts.arrayFormat === "brackets") {
        const bracketKey = `${encodedKey}[]`;
        for (const v of nonEmptyValues) {
          searchParams.append(bracketKey, encoder(valueToString(v as string | number | boolean)));
          paramCount++;
        }
      } else if (opts.arrayFormat === "indices") {
        for (let i = 0; i < nonEmptyValues.length; i++) {
          const indexKey = `${encodedKey}[${i}]`;
          searchParams.append(indexKey, encoder(valueToString(nonEmptyValues[i] as string | number | boolean)));
          paramCount++;
        }
      } else {
        // repeat (default)
        for (const v of nonEmptyValues) {
          searchParams.append(encodedKey, encoder(valueToString(v as string | number | boolean)));
          paramCount++;
        }
      }
    } else {
      // Handle scalar values
      searchParams.append(encodedKey, encoder(valueToString(value as string | number | boolean)));
      paramCount++;
    }
  }

  const queryString = searchParams.toString();

  if (queryString === "") {
    return "";
  }

  return opts.includeQuestionMark ? `?${queryString}` : queryString;
}

/**
 * Parses a query string into a parameters object.
 *
 * @param queryString - The query string to parse
 * @returns The parsed parameters object
 *
 * @example
 * ```ts
 * parseQueryString("a=1&b=hello") // { a: "1", b: "hello" }
 * parseQueryString("?a=1&b=hello") // { a: "1", b: "hello" }
 * parseQueryString("a=1&a=2&a=3") // { a: ["1", "2", "3"] }
 * parseQueryString("") // {}
 * ```
 */
export function parseQueryString(
  queryString: string | null | undefined,
): Record<string, string | string[]> {
  if (!queryString || typeof queryString !== "string") {
    return {};
  }

  // Remove leading '?' if present
  const cleaned = queryString.startsWith("?") ? queryString.slice(1) : queryString;

  if (cleaned === "") {
    return {};
  }

  const searchParams = new URLSearchParams(cleaned);
  const result: Record<string, string | string[]> = {};

  for (const key of searchParams.keys()) {
    const values = searchParams.getAll(key);
    if (values.length === 1) {
      result[key] = values[0];
    } else {
      result[key] = values;
    }
  }

  return result;
}

/**
 * Appends query parameters to an existing URL.
 *
 * @param url - The base URL
 * @param params - The query parameters to append
 * @param options - Building options
 * @returns The URL with appended query parameters
 *
 * @example
 * ```ts
 * appendQueryParams("https://example.com/api", { page: 1, limit: 20 })
 * // "https://example.com/api?page=1&limit=20"
 *
 * appendQueryParams("https://example.com/api?existing=1", { new: 2 })
 * // "https://example.com/api?existing=1&new=2"
 * ```
 */
export function appendQueryParams(
  url: string,
  params: QueryParams,
  options: BuildQueryStringOptions = {},
): string {
  if (!url || typeof url !== "string") {
    return url;
  }

  const queryString = buildQueryString(params, { ...options, includeQuestionMark: false });

  if (queryString === "") {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${queryString}`;
}

/**
 * Merges multiple query parameter objects into one.
 * Later objects override earlier ones for the same key.
 *
 * @param paramsList - The query parameter objects to merge
 * @returns The merged query parameters
 *
 * @example
 * ```ts
 * mergeQueryParams({ a: 1, b: 2 }, { b: 3, c: 4 })
 * // { a: 1, b: 3, c: 4 }
 * ```
 */
export function mergeQueryParams(
  ...paramsList: QueryParams[]
): QueryParams {
  const result: QueryParams = {};

  for (const params of paramsList) {
    if (params && typeof params === "object" && !Array.isArray(params)) {
      Object.assign(result, params);
    }
  }

  return result;
}

/**
 * Removes specific keys from query parameters.
 *
 * @param params - The query parameters
 * @param keysToRemove - The keys to remove
 * @returns The query parameters without the specified keys
 *
 * @example
 * ```ts
 * omitQueryParams({ a: 1, b: 2, c: 3 }, ["b"])
 * // { a: 1, c: 3 }
 * ```
 */
export function omitQueryParams(
  params: QueryParams,
  keysToRemove: string[],
): QueryParams {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    return {};
  }

  const keySet = new Set(keysToRemove);
  const result: QueryParams = {};

  for (const key of Object.keys(params)) {
    if (!keySet.has(key)) {
      result[key] = params[key];
    }
  }

  return result;
}

/**
 * Picks specific keys from query parameters.
 *
 * @param params - The query parameters
 * @param keysToPick - The keys to pick
 * @returns The query parameters with only the specified keys
 *
 * @example
 * ```ts
 * pickQueryParams({ a: 1, b: 2, c: 3 }, ["a", "c"])
 * // { a: 1, c: 3 }
 * ```
 */
export function pickQueryParams(
  params: QueryParams,
  keysToPick: string[],
): QueryParams {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    return {};
  }

  const keySet = new Set(keysToPick);
  const result: QueryParams = {};

  for (const key of Object.keys(params)) {
    if (keySet.has(key)) {
      result[key] = params[key];
    }
  }

  return result;
}

/**
 * Checks if a query string has any parameters.
 *
 * @param queryString - The query string to check
 * @returns True if the query string has parameters, false otherwise
 *
 * @example
 * ```ts
 * hasQueryParams("a=1&b=2") // true
 * hasQueryParams("") // false
 * hasQueryParams("?") // false
 * ```
 */
export function hasQueryParams(queryString: string | null | undefined): boolean {
  if (!queryString || typeof queryString !== "string") {
    return false;
  }

  const cleaned = queryString.startsWith("?") ? queryString.slice(1) : queryString;
  return cleaned.length > 0;
}

export default buildQueryString;
