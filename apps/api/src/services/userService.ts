export interface CreateUserInput {
  [key: string]: unknown;
}

export interface UserRecord extends CreateUserInput {
  id: string;
}

/**
 * Returns the current placeholder user list.
 *
 * The service intentionally preserves the existing stubbed behavior while the
 * backing data store is not implemented.
 */
export function listUsers(): UserRecord[] {
  return [];
}

/**
 * Builds the placeholder user creation response from the incoming request body.
 *
 * @param input - Request payload submitted to the create-user endpoint.
 * @returns A stub user record with the stable placeholder id and submitted data.
 */
export function createUser(input: CreateUserInput): UserRecord {
  return {
    id: "stub-user-id",
    ...input
  };
}