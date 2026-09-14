/**
 * CORS configuration helper.
 *
 * Provides a dependency-free utility to parse comma-separated allowed
 * CORS origins from environment-style strings, and to build an Express
 * CORS options object suitable for use with the `cors` middleware or
 * a custom implementation.
 */

/**
 * Parsed CORS configuration.
 */
export type CorsConfig = {
  /** The list of allowed origins, trimmed and deduplicated. */
  allowedOrigins: string[];
  /** Whether the wildcard origin "*" is present. */
  allowAll: boolean;
};

/**
 * Parse a comma-separated string of allowed CORS origins.
 *
 * Handles:
 * - Empty / undefined input (returns empty list)
 * - Whitespace around entries (trimmed)
 * - Duplicate entries (deduplicated, preserving first occurrence)
 * - The wildcard "*" origin (flagged via `allowAll`)
 * - Trailing slashes on origins (normalized)
 *
 * @example
 * ```ts
 * parseAllowedOrigins("https://example.com, https://api.example.com");
 * // => ["https://example.com", "https://api.example.com"]
 *
 * parseAllowedOrigins("*");
 * // => ["*"]
 * ```
 *
 * @param input - The raw environment-style string, or undefined.
 * @returns A {@link CorsConfig} with parsed origins and flags.
 */
export function parseAllowedOrigins(input?: string | null): CorsConfig {
  if (!input || typeof input !== "string" || input.trim().length === 0) {
    return { allowedOrigins: [], allowAll: false };
  }

  const rawOrigins = input
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  // Normalize: remove trailing slash, deduplicate
  const seen = new Set<string>();
  const allowedOrigins: string[] = [];

  for (const origin of rawOrigins) {
    const normalized = origin === "*" ? "*" : origin.replace(/\/+$/, "");
    if (!seen.has(normalized)) {
      seen.add(normalized);
      allowedOrigins.push(normalized);
    }
  }

  const allowAll = allowedOrigins.includes("*");

  return { allowedOrigins, allowAll };
}

/**
 * Check whether a specific request origin is allowed by the CORS config.
 *
 * @example
 * ```ts
 * const config = parseAllowedOrigins("https://example.com, https://api.example.com");
 * isOriginAllowed(config, "https://example.com"); // => true
 * isOriginAllowed(config, "https://evil.com");    // => false
 * ```
 *
 * @param config - The parsed CORS config.
 * @param origin - The request origin to check.
 * @returns True if the origin is allowed (or wildcard is enabled).
 */
export function isOriginAllowed(config: CorsConfig, origin?: string): boolean {
  if (config.allowAll) return true;
  if (!origin) return false;
  const normalized = origin.replace(/\/+$/, "");
  return config.allowedOrigins.includes(normalized);
}

/**
 * Build an Express-compatible CORS options object from an environment string.
 *
 * The returned object has an `origin` function that can be passed directly
 * to the `cors` Express middleware.
 *
 * @example
 * ```ts
 * import cors from "cors";
 * import { buildCorsOptions } from "./utils/corsConfig";
 *
 * const corsOptions = buildCorsOptions(process.env.CORS_ALLOWED_ORIGINS);
 * app.use(cors(corsOptions));
 * ```
 *
 * @param envValue - The raw CORS_ALLOWED_ORIGINS environment value.
 * @returns An object with an `origin` callback and common CORS defaults.
 */
export function buildCorsOptions(envValue?: string | null) {
  const config = parseAllowedOrigins(envValue);

  return {
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      // Allow requests with no origin (e.g. curl, server-to-server)
      if (!requestOrigin) {
        return callback(null, true);
      }
      callback(null, isOriginAllowed(config, requestOrigin));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400
  };
}

/**
 * Default environment variable name for CORS allowed origins.
 */
export const CORS_ENV_VAR = "CORS_ALLOWED_ORIGINS";
