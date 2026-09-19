export type UserPayload = Record<string, unknown>;

export type StubUser = UserPayload & {
  id: string;
};

export type UserServiceResponse<T> = {
  data: T;
  message: string;
};

/**
 * Returns the current user collection for the `GET /users` route.
 *
 * This placeholder keeps the public API response shape stable until the service
 * is connected to persistence.
 *
 * @returns A response object containing the currently available users.
 */
export function listUsers(): UserServiceResponse<StubUser[]> {
  return {
    data: [],
    message: "User listing is not implemented yet.",
  };
}

/**
 * Builds the placeholder response for the `POST /users` route.
 *
 * The submitted payload is echoed after the stub id so the route preserves its
 * existing behavior while future persistence and validation work is added.
 *
 * @param payload - User fields submitted by the request body.
 * @returns A response object containing the stub user record.
 */
export function createUser(
  payload: UserPayload
): UserServiceResponse<StubUser> {
  return {
    data: {
      id: "stub-user-id",
      ...payload,
    },
    message: "User creation is not implemented yet.",
  };
}
