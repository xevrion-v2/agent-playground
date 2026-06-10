import { User } from '@prisma/client';
import { prisma } from '@packages/db';

/**
 * Service for managing user-related operations
 * @module userService
 */

/**
 * Finds a user by their unique identifier
 * @param {string} id - The unique identifier of the user
 * @returns {Promise<User | null>} The found user or null if not found
 * @example
 * const user = await findUserById('123');
 */
export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a user by their email address
 * @param {string} email - The email address of the user
 * @returns {Promise<User | null>} The found user or null if not found
 * @example
 * const user = await findUserByEmail('user@example.com');
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Creates a new user with the provided data
 * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt'>} userData - The data for creating the user
 * @returns {Promise<User>} The created user
 * @example
 * const newUser = await createUser({ name: 'John', email: 'john@example.com' });
 */
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  return prisma.user.create({
    data: userData,
  });
}

/**
 * Updates an existing user's information
 * @param {string} id - The unique identifier of the user to update
 * @param {Partial<User>} userData - The partial user data to update
 * @returns {Promise<User>} The updated user
 * @example
 * const updatedUser = await updateUser('123', { name: 'Jane' });
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: userData,
  });
}

/**
 * Deletes a user by their unique identifier
 * @param {string} id - The unique identifier of the user to delete
 * @returns {Promise<User>} The deleted user
 * @example
 * const deletedUser = await deleteUser('123');
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Retrieves all users from the database
 * @returns {Promise<User[]>} Array of all users
 * @example
 * const users = await getAllUsers();
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Finds users by their name (case insensitive)
 * @param {string} name - The name to search for
 * @returns {Promise<User[]>} Array of matching users
 * @example
 * const users = await findUsersByName('John');
 */
export async function findUsersByName(name: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
}