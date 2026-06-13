/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type CreateUserInput = Prisma.UserCreateInput;

/**
 * Retrieves all users from the database.
 * Excludes sensitive fields (password, emailVerified) from the result.
 *
 * @returns {Promise<Partial<User>[]>} Array of user objects without sensitive data
 */
export async function getAllUsers(): Promise<Partial<User>[]> {
  return prisma.user.findMany({
    select: {
  });
}

/**
 * Finds a single user by their unique identifier.
 * Excludes the password field from the result.
 *
 * @param {string} id - The unique user ID
 * @returns {Promise<Partial<User> | null>} The user object without password, or null if not found
 */
export async function getUserById(id: string): Promise<Partial<User> | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a single user by their email address.
 * Includes the password hash for authentication purposes.
 *
 * @param {string} email - The user's email address
 * @returns {Promise<User | null>} The user object with password, or null if not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
}

// TODO: Add password hashing before creating user
/**
 * Creates a new user in the database.
 * Hashes the provided password before storage.
 * TODO: Implement password hashing.
 *
 * @param {CreateUserInput} data - The user data to create
 * @returns {Promise<User>} The newly created user object
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password as string);
  return prisma.user.create({
}

// TODO: Add password hashing before updating user
/**
 * Updates an existing user's information.
 * Hashes the provided password before storage if included.
 * TODO: Implement password hashing.
 *
 * @param {string} id - The unique user ID to update
 * @param {Prisma.UserUpdateInput} data - The fields to update
 * @returns {Promise<User>} The updated user object
 */
export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
  });
}

/**
 * Permanently removes a user from the database.
 *
 * @param {string} id - The unique user ID to delete
 * @returns {Promise<User>} The deleted user object
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },