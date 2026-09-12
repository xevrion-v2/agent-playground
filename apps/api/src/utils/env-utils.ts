/**
 * Environment variable utility functions for API configuration.
 * Provides type-safe access to environment variables with validation and defaults.
 */

/**
 * Gets a string environment variable.
 *
 * @param name - The environment variable name
 * @param defaultValue - The default value if not set
 * @returns The environment variable value or default
 *
 * @example
 * ```ts
 * getEnvString("NODE_ENV", "development") // "development" or actual value
 * getEnvString("PORT") // undefined or actual value
 * ```
 */
export function getEnvString(name: string, defaultValue?: string): string | undefined {
  const value = process.env[name];
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }
  return value;
}

/**
 * Gets a required string environment variable. Throws if not set.
 *
 * @param name - The environment variable name
 * @returns The environment variable value
 * @throws Error if the environment variable is not set
 *
 * @example
 * ```ts
 * getRequiredEnvString("DATABASE_URL") // "postgres://..." or throws
 * ```
 */
export function getRequiredEnvString(name: string): string {
  const value = getEnvString(name);
  if (value === undefined) {
    throw new Error(`Required environment variable "${name}" is not set`);
  }
  return value;
}

/**
 * Gets a number environment variable.
 *
 * @param name - The environment variable name
 * @param defaultValue - The default value if not set or invalid
 * @returns The environment variable value as a number or default
 *
 * @example
 * ```ts
 * getEnvNumber("PORT", 3000) // 3000 or actual value
 * getEnvNumber("INVALID") // undefined
 * ```
 */
export function getEnvNumber(name: string, defaultValue?: number): number | undefined {
  const value = getEnvString(name);
  if (value === undefined) return defaultValue;
  const parsed = parseFloat(value);
  if (isNaN(parsed)) return defaultValue;
  return parsed;
}

/**
 * Gets a required number environment variable. Throws if not set or invalid.
 *
 * @param name - The environment variable name
 * @returns The environment variable value as a number
 * @throws Error if the environment variable is not set or invalid
 */
export function getRequiredEnvNumber(name: string): number {
  const value = getEnvNumber(name);
  if (value === undefined) {
    throw new Error(`Required environment variable "${name}" is not set or invalid`);
  }
  return value;
}

/**
 * Gets an integer environment variable.
 *
 * @param name - The environment variable name
 * @param defaultValue - The default value if not set or invalid
 * @returns The environment variable value as an integer or default
 */
export function getEnvInteger(name: string, defaultValue?: number): number | undefined {
  const value = getEnvNumber(name);
  if (value === undefined) return defaultValue;
  return Math.floor(value);
}

/**
 * Gets a required integer environment variable. Throws if not set or invalid.
 *
 * @param name - The environment variable name
 * @returns The environment variable value as an integer
 * @throws Error if the environment variable is not set or invalid
 */
export function getRequiredEnvInteger(name: string): number {
  const value = getEnvInteger(name);
  if (value === undefined) {
    throw new Error(`Required environment variable "${name}" is not set or invalid`);
  }
  return value;
}

/**
 * Gets a boolean environment variable.
 * Accepts: "true", "false", "1", "0", "yes", "no", "on", "off" (case-insensitive).
 *
 * @param name - The environment variable name
 * @param defaultValue - The default value if not set or invalid
 * @returns The environment variable value as a boolean or default
 *
 * @example
 * ```ts
 * getEnvBoolean("DEBUG", false) // false or actual value
 * getEnvBoolean("ENABLE_FEATURE") // undefined or actual value
 * ```
 */
export function getEnvBoolean(name: string, defaultValue?: boolean): boolean | undefined {
  const value = getEnvString(name);
  if (value === undefined) return defaultValue;

  const normalized = value.toLowerCase().trim();
  const truthy = ["true", "1", "yes", "on", "enabled", "active"];
  const falsy = ["false", "0", "no", "off", "disabled", "inactive"];

  if (truthy.includes(normalized)) return true;
  if (falsy.includes(normalized)) return false;
  return defaultValue;
}

/**
 * Gets a required boolean environment variable. Throws if not set or invalid.
 *
 * @param name - The environment variable name
 * @returns The environment variable value as a boolean
 * @throws Error if the environment variable is not set or invalid
 */
export function getRequiredEnvBoolean(name: string): boolean {
  const value = getEnvBoolean(name);
  if (value === undefined) {
    throw new Error(`Required environment variable "${name}" is not set or invalid`);
  }
  return value;
}

/**
 * Gets an array environment variable (comma-separated).
 *
 * @param name - The environment variable name
 * @param defaultValue - The default value if not set
 * @param separator - The separator (default: ",")
 * @returns The environment variable value as an array or default
 *
 * @example
 * ```ts
 * getEnvArray("ALLOWED_ORIGINS", []) // ["http://localhost:3000"] or []
 * getEnvArray("IPS") // undefined or actual value
 * ```
 */
export function getEnvArray(
  name: string,
  defaultValue?: string[],
  separator = ",",
): string[] | undefined {
  const value = getEnvString(name);
  if (value === undefined) return defaultValue;
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/**
 * Gets a required array environment variable. Throws if not set.
 *
 * @param name - The environment variable name
 * @param separator - The separator (default: ",")
 * @returns The environment variable value as an array
 * @throws Error if the environment variable is not set
 */
export function getRequiredEnvArray(name: string, separator = ","): string[] {
  const value = getEnvArray(name, undefined, separator);
  if (value === undefined) {
    throw new Error(`Required environment variable "${name}" is not set`);
  }
  return value;
}

/**
 * Gets a JSON environment variable.
 *
 * @param name - The environment variable name
 * @param defaultValue - The default value if not set or invalid
 * @returns The parsed JSON value or default
 *
 * @example
 * ```ts
 * getEnvJSON("CONFIG", {}) // {...} or {}
 * getEnvJSON("FEATURE_FLAGS") // undefined or actual value
 * ```
 */
export function getEnvJSON<T = unknown>(name: string, defaultValue?: T): T | undefined {
  const value = getEnvString(name);
  if (value === undefined) return defaultValue;
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Gets a required JSON environment variable. Throws if not set or invalid.
 *
 * @param name - The environment variable name
 * @returns The parsed JSON value
 * @throws Error if the environment variable is not set or invalid
 */
export function getRequiredEnvJSON<T = unknown>(name: string): T {
  const value = getEnvString(name);
  if (value === undefined) {
    throw new Error(`Required environment variable "${name}" is not set`);
  }
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    throw new Error(`Environment variable "${name}" is not valid JSON: ${error}`);
  }
}

/**
 * Gets a URL environment variable.
 *
 * @param name - The environment variable name
 * @param defaultValue - The default value if not set or invalid
 * @returns The URL object or default
 *
 * @example
 * ```ts
 * getEnvUrl("DATABASE_URL") // URL object or undefined
 * getEnvUrl("API_URL", "http://localhost:3000") // URL object or default
 * ```
 */
export function getEnvUrl(name: string, defaultValue?: string): URL | undefined {
  const value = getEnvString(name, defaultValue);
  if (value === undefined) return undefined;
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

/**
 * Gets a required URL environment variable. Throws if not set or invalid.
 *
 * @param name - The environment variable name
 * @returns The URL object
 * @throws Error if the environment variable is not set or invalid
 */
export function getRequiredEnvUrl(name: string): URL {
  const value = getEnvString(name);
  if (value === undefined) {
    throw new Error(`Required environment variable "${name}" is not set`);
  }
  try {
    return new URL(value);
  } catch (error) {
    throw new Error(`Environment variable "${name}" is not a valid URL: ${error}`);
  }
}

/**
 * Checks if an environment variable is set.
 *
 * @param name - The environment variable name
 * @returns True if the environment variable is set (not empty), false otherwise
 */
export function isEnvSet(name: string): boolean {
  const value = process.env[name];
  return value !== undefined && value !== null && value !== "";
}

/**
 * Checks if the current environment is development.
 *
 * @returns True if NODE_ENV is "development", false otherwise
 */
export function isDevelopment(): boolean {
  return getEnvString("NODE_ENV") === "development";
}

/**
 * Checks if the current environment is production.
 *
 * @returns True if NODE_ENV is "production", false otherwise
 */
export function isProduction(): boolean {
  return getEnvString("NODE_ENV") === "production";
}

/**
 * Checks if the current environment is test.
 *
 * @returns True if NODE_ENV is "test", false otherwise
 */
export function isTest(): boolean {
  return getEnvString("NODE_ENV") === "test";
}

/**
 * Gets the current environment name.
 *
 * @returns The NODE_ENV value or "development"
 */
export function getEnvironment(): string {
  return getEnvString("NODE_ENV", "development") ?? "development";
}

/**
 * Validates that all required environment variables are set.
 *
 * @param requiredVars - The list of required environment variable names
 * @returns An object with valid flag and missing variables list
 *
 * @example
 * ```ts
 * validateEnv(["DATABASE_URL", "PORT"]) // { valid: true, missing: [] }
 * validateEnv(["MISSING_VAR"]) // { valid: false, missing: ["MISSING_VAR"] }
 * ```
 */
export function validateEnv(requiredVars: string[]): {
  valid: boolean;
  missing: string[];
} {
  if (!Array.isArray(requiredVars)) return { valid: true, missing: [] };
  const missing = requiredVars.filter((name) => !isEnvSet(name));
  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Asserts that all required environment variables are set. Throws if any are missing.
 *
 * @param requiredVars - The list of required environment variable names
 * @throws Error if any required environment variables are missing
 */
export function assertEnv(requiredVars: string[]): void {
  const { valid, missing } = validateEnv(requiredVars);
  if (!valid) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
}

/**
 * Gets all environment variables with a specific prefix.
 *
 * @param prefix - The prefix to filter by
 * @param stripPrefix - Whether to strip the prefix from the keys (default: true)
 * @returns An object with the filtered environment variables
 *
 * @example
 * ```ts
 * getEnvWithPrefix("API_") // { URL: "...", KEY: "..." }
 * getEnvWithPrefix("DB_", false) // { DB_URL: "...", DB_HOST: "..." }
 * ```
 */
export function getEnvWithPrefix(
  prefix: string,
  stripPrefix = true,
): Record<string, string> {
  if (typeof prefix !== "string" || !prefix) return {};
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(prefix) && value !== undefined) {
      const newKey = stripPrefix ? key.slice(prefix.length) : key;
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Loads environment variables from a simple key=value string.
 *
 * @param envString - The environment variable string
 * @param override - Whether to override existing variables (default: false)
 *
 * @example
 * ```ts
 * loadEnvString("KEY1=value1\nKEY2=value2")
 * ```
 */
export function loadEnvString(envString: string, override = false): void {
  if (typeof envString !== "string" || !envString) return;

  const lines = envString.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    // Remove surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (override || !isEnvSet(key)) {
      process.env[key] = value;
    }
  }
}

export default {
  getEnvString,
  getRequiredEnvString,
  getEnvNumber,
  getRequiredEnvNumber,
  getEnvInteger,
  getRequiredEnvInteger,
  getEnvBoolean,
  getRequiredEnvBoolean,
  getEnvArray,
  getRequiredEnvArray,
  getEnvJSON,
  getRequiredEnvJSON,
  getEnvUrl,
  getRequiredEnvUrl,
  isEnvSet,
  isDevelopment,
  isProduction,
  isTest,
  getEnvironment,
  validateEnv,
  assertEnv,
  getEnvWithPrefix,
  loadEnvString,
};
