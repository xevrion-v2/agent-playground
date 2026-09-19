export type CreateUserPayload = Record<string, unknown>;

export type StubUser = CreateUserPayload & {
  id: string;
};

/**
 * Returns the current placeholder user list until persistence is implemented.
 */
export function listUsers(): StubUser[] {
  return [];
}

/**
 * Builds the current placeholder user response while preserving submitted fields.
 */
export function createUser(payload: CreateUserPayload): StubUser {
  return {
    id: "stub-user-id",
    ...payload
  };
}
