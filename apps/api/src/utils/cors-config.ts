/**
 * CORS configuration constants for API middleware.
 *
 * @example
 * `	s
 * import { CorsConfig } from './cors-config';
 * app.use(cors(CorsConfig.DEFAULT));
 * `
 */
export const CorsConfig = {
  ALLOWED_ORIGINS: ['http://localhost:3000', 'https://taskflow.example.com'] as const,
  ALLOWED_METHODS: ['GET', 'POST', 'PATCH', 'DELETE'] as const,
  ALLOWED_HEADERS: ['Content-Type', 'Authorization'] as const,
  CREDENTIALS: true as const,
  MAX_AGE: 86400 as const,
} as const;
