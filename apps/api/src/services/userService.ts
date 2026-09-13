/**
 * Service layer for user-related business logic.
 *
 * Handles user retrieval, creation, and updates.
 * Delegates to the database layer for persistence.
 */

export interface UserDTO {
  id: string;
  email: string;
  name?: string;
}

const users: UserDTO[] = [];

/**
 * Retrieve all registered users.
 */
export async function listUsers(): Promise<UserDTO[]> {
  return users;
}

/**
 * Create a new user entry.
 * @param email - User's email address
 * @param name - Optional display name
 * @returns The newly created user
 */
export async function createUser(email: string, name?: string): Promise<UserDTO> {
  const user: UserDTO = {
    id: `user-${users.length + 1}`,
    email,
    name,
  };
  users.push(user);
  return user;
}
