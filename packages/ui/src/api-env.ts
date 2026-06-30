// ponytail: API environment helper
function ge(key: string, fb = ''): string {
  const g = globalThis as Record<string, unknown>;
  const p = g.process as { env?: Record<string, string> } | undefined;
  return p?.env?.[key] ?? fb;
}
export const API_BASE_URL = ge('NEXT_PUBLIC_API_URL', '');
export const API_VERSION = ge('API_VERSION', 'v1');
export function isProduction(): boolean {
  return ge('NODE_ENV') === 'production';
}
