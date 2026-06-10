/**
 * User service - handles business logic for user-related operations.
 * Provides CRUD operations and search functionality for users.
 */

import { PrismaClient, User } from '@prisma/client';
import { hashPassword } from '../utils/password';


export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Create a new user in the database.
 * @param data - The user data excluding auto-generated fields.
 * @returns The created user record.
 * @throws Will throw if email already exists or required fields are missing.
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
  });
}

/**
 * Retrieve all users from the database.
 * @returns Array of all user records.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Retrieve a single user by their unique ID.
 * @param id - The user's unique identifier.
 * @returns The user record, or null if not found.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Retrieve a single user by their email address.
 * @param email - The user's email address.
 * @returns The user record, or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}
  return prisma.user.update({ where: { id }, data });
}

/**
 * Update a user's information.
 * @param id - The user's unique identifier.
 * @param data - Partial user data to update.
 * @returns The updated user record.
 * @throws Will throw if user is not found.
 */
export async function updateUser(
  id: string,
  data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  });
}

/**
 * Delete a user from the database.
 * @param id - The user's unique identifier.
 * @returns The deleted user record.
 * @throws Will throw if user is not found.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}
  return prisma.user.findMany({ where: { role: 'FREELANCER' } });
}

/**
 * Search for users by name (case-insensitive partial match).
 * @param query - The search string to match against user names.
 * @returns Array of matching user records.
 */
export async function searchUsersByName(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {