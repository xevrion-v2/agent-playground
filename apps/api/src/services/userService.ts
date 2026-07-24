export type UserPayload = Record<string, unknown>;

export type StubUser = UserPayload & {
  id: string;
};

/**
 * Returns the current user collection.
 *
 * This is a placeholder until the API is connected to persistent storage, so it
 * intentionally returns an empty list while preserving the route response shape.
 */
export function listUsers(): StubUser[] {
  return [];
}

/**
 * Builds the stub user response for a create-user request.
 *
 * The request payload is echoed after the placeholder id to match the existing
 * route behavior; future persistence work should replace this with validation
 * and database-backed creation.
 */
export function createUser(payload: UserPayload): StubUser {
  return {
    id: "stub-user-id",
    ...payload
  };
}
