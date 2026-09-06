/**
 * Validates a user creation payload.
 * @param payload - The user payload to validate.
 * @returns An object with validation errors, if any.
 */
export function validateUserPayload(payload: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!payload || typeof payload !== 'object') {
    errors.push('Payload must be an object');
    return { valid: false, errors };
  }

  const { email, name } = payload as { email?: unknown; name?: unknown };

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (name && typeof name !== 'string') {
    errors.push('Name must be a string');
  }

  return { valid: errors.length === 0, errors };
}