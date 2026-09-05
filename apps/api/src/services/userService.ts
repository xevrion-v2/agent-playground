/**
 * Placeholder user service for the TaskFlow API.
 *
 * The current app does not persist users yet, so these helpers keep the route
 * behavior explicit while documenting the intended service boundary for future
 * database-backed implementations.
 */

export type UserStub = {
  id: string;
  [key: string]: unknown;
};

/**
 * Return the current user collection.
 *
 * This is intentionally empty until the API is wired to the database package.
 */
export function listUsers(): UserStub[] {
  return [];
}

/**
 * Build the placeholder response for a newly created user.
 *
 * The fixed id mirrors the existing route stub and should be replaced with a
 * database-generated identifier once persistence is implemented.
 */
export function createUser(payload: Record<string, unknown>): UserStub {
  return {
    id: "stub-user-id",
    ...payload
  };
}
