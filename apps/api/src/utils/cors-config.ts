export type CorsOrigin = string;

export interface CorsOriginOptions {
  readonly fallback?: readonly CorsOrigin[];
}

/**
 * Parses comma-separated CORS origins from environment-style strings.
 *
 * Empty entries are ignored, surrounding whitespace is trimmed, and duplicate
 * origins are removed while preserving the first occurrence order.
 */
export function parseCorsOrigins(
  value: string | null | undefined,
  options: CorsOriginOptions = {}
): CorsOrigin[] {
  const origins = value
    ?.split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  const parsed = dedupeOrigins(origins ?? []);
  return parsed.length > 0 ? parsed : [...(options.fallback ?? [])];
}

/**
 * Builds a small CORS config object from an environment-style origin list.
 */
export function createCorsConfig(
  value: string | null | undefined,
  options?: CorsOriginOptions
): { readonly allowedOrigins: readonly CorsOrigin[] } {
  return { allowedOrigins: parseCorsOrigins(value, options) };
}

function dedupeOrigins(origins: readonly CorsOrigin[]): CorsOrigin[] {
  return [...new Set(origins)];
}
