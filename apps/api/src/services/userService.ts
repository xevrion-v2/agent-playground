/**
 * User service for managing user-related operations.
 * Provides CRUD operations and business logic for user accounts.
 */

import { PrismaClient, User } from '@prisma/client';
import { hashPassword } from '../utils/password';


export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of all users.
 */
export async function getAllUsers(): Promise<User[]>;

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
/**
 * Finds a user by their email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} A promise that resolves to the user if found, null otherwise.
 */
export async function getUserByEmail(email: string): Promise<User | null>;

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
export async function createUser(data: UserCreateInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password);

/**
 * Creates a new user with a hashed password.
 * @param {UserCreateInput} data - The user data to create.
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export async function createUser(data: UserCreateInput): Promise<User>;

export async function createUser(data: UserCreateInput): Promise<User> {
  return prisma.user.create({
    data: {
      ...data,
  });
}

/**
 * Updates an existing user's information.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<User>} data - The user data to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User>;

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return prisma.user.update({
    where: { id },
  });
}

/**
 * Deletes a user from the database.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user.
 */
export async function deleteUser(id: string): Promise<User>;

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },