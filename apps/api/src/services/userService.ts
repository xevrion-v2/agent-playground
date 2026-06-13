/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 * @module services/userService
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type UserCreateInput = Prisma.UserCreateInput;

/**
 * Retrieve a user by their unique ID.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<User | null>} The user object if found, otherwise null.
 * @throws {Error} If the database query fails.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieve a user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<User | null>} The user object if found, otherwise null.
 * @throws {Error} If the database query fails.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Retrieve all users from the database.
 * @returns {Promise<User[]>} An array of all user objects.
 * @throws {Error} If the database query fails.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    include: {
  });
}

/**
 * Create a new user in the database.
 * @param {Omit<UserCreateInput, 'password'> & { password: string }} data - The user data including a plaintext password.
 * @returns {Promise<User>} The newly created user object.
 * @throws {Error} If the email is already taken or the database query fails.
 */
export async function createUser(
  data: Omit<UserCreateInput, 'password'> & { password: string }
): Promise<User> {
  });
}

/**
 * Update an existing user's information.
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<UserCreateInput>} data - The fields to update.
 * @returns {Promise<User>} The updated user object.
 * @throws {Error} If the user is not found or the database query fails.
 */
export async function updateUser(
  id: string,
  data: Partial<UserCreateInput>
  });
}

/**
 * Delete a user from the database.
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} The deleted user object.
 * @throws {Error} If the user is not found or the database query fails.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },