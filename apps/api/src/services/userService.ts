/**
 * User service layer for TaskFlow API.
 *
 * These helpers isolate user-domain logic from Express route handlers so
 * controllers stay thin and behavior is easier to unit test later.
 */

export type UserRecord = {
  id: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
};

export type ListUsersResult = {
  data: UserRecord[];
  message: string;
};

export type CreateUserInput = Record<string, unknown>;

export type CreateUserResult = {
  data: UserRecord;
  message: string;
};

/**
 * List users known to the system.
 *
 * Currently returns an empty list with a stub message until persistence is wired.
 *
 * @returns A result object with `data` (array of users) and a human-readable `message`.
 */
export function listUsers(): ListUsersResult {
  return {
    data: [],
    message: "User listing is not implemented yet.",
  };
}

/**
 * Create a user from the given input payload.
 *
 * The current implementation is a stub that echoes the request body with a
 * generated placeholder id. It does not persist to a database.
 *
 * @param input - Fields provided by the client for the new user.
 * @returns A result object with the created (stub) user in `data` and a message.
 */
export function createUser(input: CreateUserInput): CreateUserResult {
  return {
    data: {
      id: "stub-user-id",
      ...input,
    },
    message: "User creation is not implemented yet.",
  };
}
