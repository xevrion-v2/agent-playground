/**
 * User service for managing user-related database operations.
 * Provides CRUD operations and search functionality for users.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


export type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Creates a new user in the database with a hashed password.
 * @param data - The user data excluding auto-generated fields.
 * @returns The created user object.
 * @throws Will throw an error if the email is already in use.
 */
export async function createUser(data: UserCreateInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password);

  });
}

/**
 * Retrieves all users from the database.
 * @returns An array of all user objects.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Finds a single user by their unique ID.
 * @param id - The unique identifier of the user.
 * @returns The user object if found, otherwise null.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a single user by their email address.
 * @param email - The email address to search for.
 * @returns The user object if found, otherwise null.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Updates a user's information by their ID.
 * @param id - The unique identifier of the user to update.
 * @param data - Partial user data to apply.
 * @returns The updated user object.
 */
export async function updateUser(
  id: string,
  data: Partial<UserCreateInput>
  });
}

/**
 * Deletes a user from the database by their ID.
 * @param id - The unique identifier of the user to delete.
 * @returns The deleted user object.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
 });
}

/**
 * Searches for users by name or email using a case-insensitive search.
 * @param query - The search string to match against user names and emails.
 * @returns An array of matching user objects.
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {