export interface CreatedUser {
  id: string;
  [key: string]: unknown;
}

export interface UserListResponse {
  data: unknown[];
  message: string;
}

export interface UserCreateResponse {
  data: CreatedUser;
  message: string;
}

/**
 * Returns the current placeholder user list response.
 *
 * This keeps the not-yet-implemented list behavior in one service layer so the
 * route can stay thin while the real data source is added later.
 */
export function listUsers(): UserListResponse {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Builds the current placeholder user creation response.
 *
 * @param input - Request body fields to echo in the stubbed user payload.
 * @returns The existing creation response shape with the fixed stub user id.
 */
export function createUser(input: Record<string, unknown>): UserCreateResponse {
  return {
    data: {
      id: "stub-user-id",
      ...input
    },
    message: "User creation is not implemented yet."
  };
}
