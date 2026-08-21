export type CreateUserInput = Record<string, unknown>;

export interface StubUser {
  id: string;
  [key: string]: unknown;
}

export interface UserServiceMessage<TData> {
  data: TData;
  message: string;
}

/**
 * Returns the current placeholder user collection.
 *
 * The API does not have persistent user storage yet, so callers receive an
 * empty list while the response shape stays aligned with the future CRUD API.
 */
export function listUsers(): UserServiceMessage<StubUser[]> {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Builds the placeholder response for a user creation request.
 *
 * The request payload is echoed with a stable stub id so route consumers can
 * develop against the create-user contract before database writes are added.
 */
export function createUser(input: CreateUserInput): UserServiceMessage<StubUser> {
  return {
    data: {
      id: "stub-user-id",
      ...input
    },
    message: "User creation is not implemented yet."
  };
}
