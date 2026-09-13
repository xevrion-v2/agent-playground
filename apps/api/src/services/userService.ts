export type UserRecord = {
  id: string;
  [key: string]: unknown;
};

/**
 * Returns the current user collection placeholder.
 *
 * This service keeps the route handler free of data-access details while the
 * real persistence layer is still being implemented.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Builds a placeholder user record from the incoming request payload.
 *
 * The generated id mirrors the current stub API behavior; callers are expected
 * to add validation before this is backed by persistent storage.
 */
export function createUser(payload: Record<string, unknown>): UserRecord {
  return {
    id: "stub-user-id",
    ...payload
  };
}
