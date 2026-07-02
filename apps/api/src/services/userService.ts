export type UserRecord = {
  id: string;
  [key: string]: unknown;
};

export type CreateUserPayload = Record<string, unknown>;

/**
 * Returns the current user list placeholder.
 *
 * The API does not have persistence wired yet, so this intentionally returns an
 * empty collection while preserving the eventual service boundary for callers.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Builds the current create-user placeholder response.
 *
 * The submitted payload is echoed with a stable stub id until the real user
 * persistence layer is implemented.
 */
export function createUser(payload: CreateUserPayload): UserRecord {
  return {
    id: "stub-user-id",
    ...payload
  };
}
