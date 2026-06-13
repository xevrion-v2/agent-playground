/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User } from '@prisma/client';
import { hashPassword } from '../utils/password';


export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Retrieves all users from the database.
 * @async
 * @returns {Promise<User[]>} A promise that resolves to an array of all users.
 * @throws {Error} If the database query fails.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Finds a single user by their email address.
 * @async
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} A promise that resolves to the user if found, or null if not found.
 * @throws {Error} If the database query fails.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}
export async function createUser(data: CreateUserInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}

/**
 * Updates a user's information by their ID.
 * @async
 * @param {string} id - The unique identifier of the user to update.
 * @param {Partial<User>} data - An object containing the user fields to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 * @throws {Error} If the user is not found or the database update fails.
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return prisma.user.update({
    where: { id },
  });
}

/**
 * Deletes a user from the database by their ID.
 * @async
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user.
 * @throws {Error} If the user is not found or the database deletion fails.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
}

export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
}