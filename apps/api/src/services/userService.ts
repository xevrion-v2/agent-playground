import { PrismaClient, User } from '@prisma/client';
import { prisma } from '../lib/prisma';

/**
 * Service for managing user-related database operations.
 */

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of all users.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Finds a user by their email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} A promise that resolves to the user if found, or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}
export async function createUser(data: CreateUserInput): Promise<User> {
  return prisma.user.create({ data });
}

/**
 * Updates a user's information.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<User>} data - The user data to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return prisma.user.update({ where: { id }, data });
}
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

/**
 * Deletes a user from the database by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}