export type UserInput = {
  name?: string;
  email?: string;
};

export type UserRecord = UserInput & {
  id: string;
};

/**
 * Returns the current user list.
 *
 * The API is still backed by placeholder data, so this keeps the route
 * contract explicit until a persistent user store is added.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Builds the stub user response used by the create-user route.
 *
 * The generated id mirrors the current placeholder behavior while preserving
 * any request fields supplied by the caller.
 */
export function createUser(input: UserInput): UserRecord {
  return {
    id: "stub-user-id",
    ...input
  };
}
