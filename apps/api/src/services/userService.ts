export type UserRecord = {
  id: string;
  [key: string]: unknown;
};

export type CreateUserPayload = Record<string, unknown>;

/**
 * Returns the current user collection for the API list endpoint.
 *
 * The backing store is intentionally still a placeholder. Keeping this logic
 * behind a service function gives future contributors a stable place to add
 * persistence without changing the route response shape.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Builds the placeholder user record returned by the create endpoint.
 *
 * The incoming payload is preserved to match the existing route behavior, while
 * the fixed stub id makes the non-persistent contract explicit.
 */
export function createUser(payload: CreateUserPayload): UserRecord {
  return {
    id: "stub-user-id",
    ...payload
  };
}
