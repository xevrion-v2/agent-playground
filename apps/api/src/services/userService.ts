/**
 * Stub user service for TaskFlow API routes.
 * Persistence and auth are not wired yet — these functions document intended behavior.
 */

export type UserRecord = {
  id: string;
  email: string;
  name?: string;
};

/**
 * List users with optional pagination (not implemented).
 * @param _limit Max rows to return once DB layer exists.
 */
export async function listUsers(_limit = 50): Promise<UserRecord[]> {
  return [];
}

/**
 * Create a user from validated input.
 * @param input Email and optional display name.
 * @throws When email is missing or malformed (future validation layer).
 */
export async function createUser(input: { email: string; name?: string }): Promise<UserRecord> {
  return {
    id: "stub-user-id",
    email: input.email.trim().toLowerCase(),
    ...(input.name ? { name: input.name.trim() } : {}),
  };
}

/**
 * Fetch a single user by id.
 * @param id User primary key.
 */
export async function getUserById(id: string): Promise<UserRecord | null> {
  if (!id) return null;
  return null;
}
