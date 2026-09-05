export type UserPayload = Record<string, unknown>;

export type UserRecord = UserPayload & {
  id: string;
};

/** Returns the current placeholder user collection until persistence is added. */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Builds the placeholder created-user response while preserving the current
 * route behavior of echoing submitted fields.
 */
export function createUser(payload: UserPayload = {}): UserRecord {
  return {
    id: "stub-user-id",
    ...payload
  };
}
