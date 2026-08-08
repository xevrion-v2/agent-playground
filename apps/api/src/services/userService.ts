export type UserPayload = Record<string, unknown>;

export interface UserRecord extends UserPayload {
  id: string;
}

export interface ServiceResponse<T> {
  data: T;
  message: string;
}

/**
 * Returns the current user collection.
 *
 * This is intentionally stubbed until the API is connected to the database.
 */
export function listUsers(): ServiceResponse<UserRecord[]> {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Builds the placeholder response for a newly created user.
 *
 * The request payload is echoed with a stable stub id while persistence is not implemented.
 */
export function createUser(payload: UserPayload): ServiceResponse<UserRecord> {
  return {
    data: {
      id: "stub-user-id",
      ...payload
    },
    message: "User creation is not implemented yet."
  };
}
