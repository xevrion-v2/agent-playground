/**
 * Represents a user in the system.
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
  /** Timestamp when the user was created */
  createdAt: Date;
  /** Timestamp when the user was last updated */
  updatedAt: Date;
}

/**
 * Input payload for creating a new user.
 */
export interface CreateUserInput {
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
}

const users: User[] = [];

/**
 * Returns the list of all users.
 * @returns An array of User objects.
 */
export function getUsers(): User[] {
  return users;
}

/**
 * Creates a new user and adds it to the in-memory store.
 * @param input - The user creation payload.
 * @returns The newly created User object.
 */
export function createUser(input: CreateUserInput): User {
  const user: User = {
    id: `user-${users.length + 1}`,
    email: input.email,
    name: input.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(user);
  return user;
}
