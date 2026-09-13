export type CreateUserInput = Record<string, unknown>;

export interface UserRecord extends CreateUserInput {
  id: string;
}

export interface UserServiceResponse<T> {
  data: T;
  message: string;
}

/**
 * Returns the current placeholder user collection until persistent storage is
 * connected to the API service.
 */
export function listUsers(): UserServiceResponse<UserRecord[]> {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Echoes the submitted user payload with the current stub id while user
 * creation remains a placeholder.
 *
 * @param input - Raw request body fields to include in the stub response.
 */
export function createUser(
  input: CreateUserInput
): UserServiceResponse<UserRecord> {
  return {
    data: {
      id: "stub-user-id",
      ...input
    },
    message: "User creation is not implemented yet."
  };
}
