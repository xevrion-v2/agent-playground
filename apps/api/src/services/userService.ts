export type CreateUserPayload = Record<string, unknown>;

export type StubUser = {
  id: string;
} & CreateUserPayload;

/**
 * Returns the current user collection.
 *
 * The API does not have persistence wired up yet, so this service keeps the
 * existing placeholder behavior by returning an empty list.
 */
export function listUsers(): StubUser[] {
  return [];
}

/**
 * Builds the placeholder user response for a create request.
 *
 * The incoming payload is echoed back with a stable stub id until real user
 * storage is implemented.
 */
export function createUser(payload: CreateUserPayload): StubUser {
  return {
    id: "stub-user-id",
    ...payload
  };
}
