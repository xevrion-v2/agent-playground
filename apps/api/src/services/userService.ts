export type CreateUserInput = Record<string, unknown>;

/**
 * Returns the placeholder user list used by the current `/users` route.
 * This keeps the response shape stable until real persistence is added.
 */
export function listUsers() {
  return {
    data: [],
    message: "User listing is not implemented yet."
  };
}

/**
 * Builds the placeholder user creation response for the current `/users` route.
 * The stub id mirrors existing behavior while preserving submitted fields.
 */
export function createUser(input: CreateUserInput) {
  return {
    data: {
      id: "stub-user-id",
      ...input
    },
    message: "User creation is not implemented yet."
  };
}
