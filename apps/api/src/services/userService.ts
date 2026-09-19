export type UserPayload = Record<string, unknown>;

/**
 * Return the current user collection.
 *
 * This placeholder keeps the route contract stable until database-backed
 * user lookup is implemented.
 */
export function listUsers(): UserPayload[] {
  return [];
}

/**
 * Build a newly created user response from the provided payload.
 *
 * This stub mirrors the eventual service boundary by assigning a stable
 * placeholder id while preserving the submitted request fields.
 */
export function createUser(payload: UserPayload): UserPayload {
  return {
    id: "stub-user-id",
    ...payload
  };
}
