export interface User {
  id: string
  name: string
  email: string
}

/**
 * Returns a list of all users.
 * Currently a stub — returns an empty array until persistence is implemented.
 *
 * @returns An object containing an empty data array and a status message
 */
export function listUsers(): { data: User[]; message: string } {
  return {
    data: [],
    message: "User listing is not implemented yet.",
  }
}

/**
 * Creates a new user with the provided fields.
 * Currently a stub — returns a placeholder user with a fixed id.
 *
 * @param input - The partial user data (name, email, etc.)
 * @returns An object containing the stub user and a status message
 */
export function createUser(
  input: Omit<User, "id">,
): { data: User; message: string } {
  return {
    data: { id: "stub-user-id", ...input },
    message: "User creation is not implemented yet.",
  }
}
