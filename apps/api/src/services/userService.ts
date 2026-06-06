/**
 * Represents the placeholder user record returned by the API until database-backed
 * persistence is implemented.
 */
export interface UserStub {
  id: string;
  [key: string]: unknown;
}

/**
 * Returns the current user list placeholder.
 *
 * The API does not persist users yet, so this function intentionally returns an
 * empty list while preserving a named service boundary for future database work.
 */
export function listUsers(): UserStub[] {
  return [];
}

/**
 * Builds the current user creation placeholder response.
 *
 * The submitted payload is echoed after a stable stub id so the route keeps its
 * existing response shape while future persistence logic has a clear home.
 */
export function createUser(payload: Record<string, unknown>): UserStub {
  return {
    id: "stub-user-id",
    ...payload
  };
}
