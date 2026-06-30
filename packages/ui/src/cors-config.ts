// ponytail: CORS config helper
export function parseCorsOrigins(raw: string): string[] {
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}
export const DEFAULT_CORS_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] as const;
export type CorsMethod = typeof DEFAULT_CORS_METHODS[number];
