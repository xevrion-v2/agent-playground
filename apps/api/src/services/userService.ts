/**
 * User service for managing user-related database operations.
 * Provides CRUD operations and search functionality for users.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type UserCreateInput = Prisma.UserCreateInput;

/**
 * Retrieves a user by their unique identifier.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<User | null>} The user object if found, null otherwise.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieves a user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<User | null>} The user object if found, null otherwise.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Creates a new user with a hashed password.
 * @param {Omit<UserCreateInput, 'password'> & { password: string }} data - The user data including password.
 * @returns {Promise<User>} The newly created user object.
 * @throws {Error} If the user creation fails.
 */
export async function createUser(
  data: Omit<UserCreateInput, 'password'> & { password: string }
): Promise<User> {
  });
}

/**
 * Updates an existing user's information.
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<UserCreateInput>} data - The partial user data to update.
 * @returns {Promise<User>} The updated user object.
 * @throws {Error} If the user is not found or update fails.
 */
export async function updateUser(
  id: string,
  data: Partial<UserCreateInput>
  });
}

/**
 * Deletes a user by their unique identifier.
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} The deleted user object.
 * @throws {Error} If the user is not found or deletion fails.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} An array of all user objects.
 * @deprecated Consider using paginated queries for large datasets.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    include: {
  });
}

/**
 * Searches for users by name or email matching the query string.
 * @param {string} query - The search query to match against user names or email.
 * @returns {Promise<User[]>} An array of matching user objects.
 * @throws {Error} If the search query is empty or invalid.
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {