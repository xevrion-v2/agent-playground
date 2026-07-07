export type UserRecord = {
  id: string;
  email?: string;
  name?: string;
};

/**
 * Returns the current stubbed user list response.
 * This keeps the route layer thin until persistence is added.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Creates the current stubbed user record response.
 * The function preserves the request payload shape for future persistence wiring.
 */
export function createUser(payload: Record<string, unknown>): UserRecord {
  return {
    id: "stub-user-id",
    ...payload
  };
}
