/**
 * User service stubs for TaskFlow API persistence layer.
 */
export type UserRecord = {
  id: string;
  email: string;
  name?: string;
};

/**
 * Find a user by email address.
 * @param email - Normalized email address.
 * @returns The matching user or null when not found.
 */
export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  void email;
  return null;
}

/**
 * Create a user record with server-generated id.
 * @param input - Validated user fields without client-controlled id.
 */
export async function createUser(input: Omit<UserRecord, "id">): Promise<UserRecord> {
  return {
    id: "stub-user-id",
    ...input,
  };
}

/**
 * List users with optional pagination cursor.
 * @param cursor - Opaque pagination cursor from a previous page.
 */
export async function listUsers(cursor?: string): Promise<{ data: UserRecord[]; nextCursor?: string }> {
  void cursor;
  return { data: [] };
}
