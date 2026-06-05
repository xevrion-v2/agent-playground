/**
 * User service module - handles all database operations related to users.
 * @module services/userService
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type CreateUserInput = Prisma.UserCreateInput;

/**
 * Find a user by their unique email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} The user if found, otherwise null.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
}

/**
 * Find a user by their unique identifier.
 * @param {string} id - The UUID of the user.
 * @returns {Promise<User | null>} The user if found, otherwise null.
 */
export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
}

/**
 * Create a new user with a hashed password.
 * @param {CreateUserInput} data - The user data to create.
 * @returns {Promise<User>} The newly created user.
 * @throws {Error} If the user cannot be created.
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  const { password, ...rest } = data;

  });
}

/**
 * Update a user's profile information.
 * @param {string} id - The UUID of the user to update.
 * @param {Prisma.UserUpdateInput} data - The fields to update.
 * @returns {Promise<User>} The updated user.
 * @throws {Error} If the user is not found or update fails.
 */
export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
  });
}

/**
 * Soft-delete a user by setting their deletedAt timestamp.
 * @param {string} id - The UUID of the user to delete.
 * @returns {Promise<User>} The soft-deleted user.
 * @throws {Error} If the user is not found.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.update({
    where: { id },
  });
}

/**
 * Search for users by name or email (case-insensitive, partial match).
 * @param {string} query - The search string.
 * @returns {Promise<User[]>} A list of matching users.
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {
  });
}

/**
 * Retrieve all users with their profiles.
 * @returns {Promise<User[]>} A list of all users.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}