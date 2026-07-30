/**
 * User service module for TaskFlow API.
 *
 * Provides business logic for user management including creation,
 * retrieval, and search operations. Acts as the service layer between
 * route handlers and the data layer (Prisma).
 */

/** Represents a user entity within the TaskFlow system. */
export interface User {
  /** Unique identifier for the user. */
  id: string;
  /** User's email address, used for authentication. Must be unique. */
  email: string;
  /** Display name shown in the UI. */
  name: string;
  /** User's role: either "client" or "freelancer". */
  role: "client" | "freelancer";
  /** ISO 8601 timestamp of account creation. */
  createdAt: string;
}

/** In-memory user store (placeholder until Prisma integration is complete). */
const users: User[] = [];

/**
 * Retrieve all users from the data store.
 *
 * Returns an array of all registered users. In production, this will
 * query the Prisma database with pagination support.
 *
 * @returns A promise resolving to an array of User objects. Returns an empty array if no users exist.
 */
export async function listUsers(): Promise<User[]> {
  return users;
}

/**
 * Create a new user in the data store.
 *
 * Validates the input, generates a unique ID, and stores the user.
 * In production, this will persist via Prisma and hash the password.
 *
 * @param input - The user creation payload.
 * @param input.email - The user's email address (must be unique).
 * @param input.name - The user's display name.
 * @param input.role - The user's role, defaults to "freelancer".
 * @returns A promise resolving to the newly created User object.
 * @throws {Error} If the email is already registered.
 */
export async function createUser(input: {
  email: string;
  name: string;
  role?: "client" | "freelancer";
}): Promise<User> {
  const existing = users.find((u) => u.email === input.email);
  if (existing) {
    throw new Error(`User with email ${input.email} already exists`);
  }

  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email: input.email,
    name: input.name,
    role: input.role ?? "freelancer",
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

/**
 * Find a single user by their unique identifier.
 *
 * @param id - The unique user ID to search for.
 * @returns A promise resolving to the User if found, or `null` if no user exists with the given ID.
 */
export async function findUserById(id: string): Promise<User | null> {
  return users.find((u) => u.id === id) ?? null;
}

/**
 * Search users by name or email with a case-insensitive partial match.
 *
 * @param query - The search string to match against user names and emails.
 * @returns A promise resolving to an array of matching User objects. Returns an empty array if no matches are found.
 */
export async function searchUsers(query: string): Promise<User[]> {
  const lower = query.toLowerCase();
  return users.filter(
    (u) =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower)
  );
}
