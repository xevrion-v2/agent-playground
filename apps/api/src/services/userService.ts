/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Retrieves all users from the database.
 * @param {Object} options - Query options for filtering, pagination, and sorting.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export async function getAllUsers(options?: {
  where?: Prisma.UserWhereInput;
  skip?: number;
  return prisma.user.findMany({ ...options });
}

/**
 * Retrieves a single user by their unique ID.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<User | null>} A promise that resolves to the user or null if not found.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieves a single user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<User | null>} A promise that resolves to the user or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Creates a new user in the database.
 * Hashes the password before storing.
 * @param {CreateUserInput} data - The user data to create.
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
  });
}

/**
 * Updates an existing user's information.
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<User>} data - The fields to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 * @throws {Error} If the user is not found.
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
  });
}

/**
 * Deletes a user from the database.
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user.
 * @throws {Error} If the user is not found.
 */
export async function deleteUser(id: string): Promise<User> {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
  });
}

/**
 * Searches for users by name or email.
 * @param {string} query - The search string to match against user names and emails.
 * @returns {Promise<User[]>} A promise that resolves to an array of matching users.
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {