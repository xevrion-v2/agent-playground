export type UserPayload = Record<string, unknown>;

/**
 * Return the current user collection for the API stub.
 *
 * The backing store is not implemented yet, so callers receive an empty list
 * while the route contract remains stable for future persistence work.
 */
export function listUsers(): UserPayload[] {
  return [];
}

/**
 * Build the placeholder response object for a user creation request.
 *
 * The service preserves the existing stub behavior by echoing accepted request
 * fields and assigning the fixed placeholder identifier used by the route.
 */
export function createUser(payload: UserPayload): UserPayload {
  return {
    id: "stub-user-id",
    ...payload
  };
}
