export type UserCreateInput = Record<string, unknown>;

/**
 * Return the current user listing payload.
 *
 * This is a stub until the service is connected to persistence and
 * authorization-aware visibility rules.
 */
export function listUsers() {
  return [];
}

/**
 * Build the current user creation payload.
 *
 * This is a stub until validation, duplicate checks, and database writes are
 * implemented by the service layer.
 */
export function createUser(input: UserCreateInput) {
  return {
    id: "stub-user-id",
    ...input
  };
}
