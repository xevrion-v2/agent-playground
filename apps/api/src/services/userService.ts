/**
 * User service - handles business logic for user-related operations.
 * Provides CRUD operations and search functionality for users.
 * @module services/userService
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type UserCreateInput = Prisma.UserCreateInput;

/**
 * Retrieve all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of all users.
 */
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

/**
 * Retrieve a single user by their unique ID.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<User | null>} A promise that resolves to the user if found, or null.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Find a user by their email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} A promise that resolves to the user if found, or null.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Create a new user in the database.
 * Hashes the provided password before storing.
 * @param {Omit<UserCreateInput, 'id' | 'createdAt' | 'updatedAt'>} data - The user data to create.
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export const createUser = async (
  data: Omit<UserCreateInput, 'id' | 'createdAt' | 'updatedAt'>
): Promise<User> => {
  });
};

/**
 * Update an existing user's information.
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<UserCreateInput>} data - The fields to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 * @throws {Error} If the user is not found.
 */
export const updateUser = async (
  id: string,
  data: Partial<UserCreateInput>
  });
};

/**
 * Delete a user from the database.
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user.
 * @throws {Error} If the user is not found.
 */
export const deleteUser = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Search for users by name (case-insensitive partial match).
 * @param {string} query - The search string to match against user names.
 * @returns {Promise<User[]>} A promise that resolves to an array of matching users.
 */
export const searchUsers = async (query: string): Promise<User[]> => {
  return prisma.user.findMany({
    where: {