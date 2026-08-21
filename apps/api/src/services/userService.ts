export type CreateUserInput = Record<string, unknown>;

export type UserRecord = {
  id: string;
} & CreateUserInput;

/**
 * Returns the current user list.
 *
 * This service is a placeholder until persistence is added, so callers receive
 * an empty collection while the route contract remains stable.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Builds a stub user record from the submitted request body.
 *
 * The generated ID makes the create-user route behave like a successful
 * creation endpoint without requiring a database connection yet.
 */
export function createUser(input: CreateUserInput): UserRecord {
  return {
    id: "stub-user-id",
    ...input
  };
}
