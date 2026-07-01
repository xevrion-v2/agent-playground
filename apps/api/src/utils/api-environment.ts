/**
 * API environment constants for client/server configuration.
 *
 * @example
 * `	s
 * import { ApiEnv } from './api-environment';
 * const baseUrl = ApiEnv.BASE_URL[ApiEnv.PRODUCTION];
 * `
 */
export const ApiEnv = {
  PRODUCTION: 'production' as const,
  STAGING: 'staging' as const,
  DEVELOPMENT: 'development' as const,
  TEST: 'test' as const,
} as const;

export type ApiEnv = (typeof ApiEnv)[keyof typeof ApiEnv];
