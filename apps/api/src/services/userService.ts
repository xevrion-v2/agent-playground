/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';


const SALT_ROUNDS = 10;

/**
 * Retrieves all users from the database.
 * Excludes sensitive fields like password hashes.
 *
 * @returns {Promise<Omit<User, 'password'>[]>} Array of user objects without passwords
 */
export async function getAllUsers(): Promise<Omit<User, 'password'>[]> {
  return prisma.user.findMany({
    select: {
  });
}

/**
 * Finds a single user by their unique identifier.
 * Excludes the password field from the result.
 *
 * @param {string} id - The user's UUID
 * @returns {Promise<Omit<User, 'password'> | null>} The user object or null if not found
 */
export async function getUserById(id: string): Promise<Omit<User, 'password'> | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a user by their email address.
 * Includes the password hash for authentication purposes.
 *
 * @param {string} email - The user's email address
 * @returns {Promise<User | null>} The user object with password or null if not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
}

type CreateUserInput = Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Creates a new user with a hashed password.
 *
 * @param {CreateUserInput} data - The user data excluding auto-generated fields
 * @returns {Promise<Omit<User, 'password'>>} The newly created user without password
 * @throws {Error} If the email is already in use
 */
export async function createUser(data: CreateUserInput): Promise<Omit<User, 'password'>> {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

}

type UpdateUserInput = Partial<Omit<Prisma.UserUpdateInput, 'id' | 'createdAt' | 'updatedAt'>>;

/**
 * Updates an existing user's information.
 *
 * @param {string} id - The user's UUID
 * @param {UpdateUserInput} data - Partial user data to update
 * @returns {Promise<Omit<User, 'password'>>} The updated user without password
 * @throws {Error} If the user is not found
 */
export async function updateUser(id: string, data: UpdateUserInput): Promise<Omit<User, 'password'>> {
  const updateData: Prisma.UserUpdateInput = { ...data };

  });
}

/**
 * Permanently deletes a user from the database.
 *
 * @param {string} id - The user's UUID
 * @returns {Promise<Omit<User, 'password'>>} The deleted user without password
 * @throws {Error} If the user is not found
 */
export async function deleteUser(id: string): Promise<Omit<User, 'password'>> {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Searches for users by name or email using a case-insensitive query.
 * Useful for the user search feature in the frontend.
 *
 * @param {string} query - The search string to match against name or email
 * @returns {Promise<Omit<User, 'password'>[]>} Array of matching users without passwords
 */
export async function searchUsers(query: string): Promise<Omit<User, 'password'>[]> {
  return prisma.user.findMany({
    where: {