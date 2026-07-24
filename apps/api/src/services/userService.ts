/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type UserCreateInput = Prisma.UserCreateInput;

/**
 * Retrieve a user by their unique ID.
 * @param id - The unique identifier of the user.
 * @returns The user object, or null if not found.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieve a user by their email address.
 * @param email - The email address of the user.
 * @returns The user object, or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Create a new user in the database.
 * Hashes the password before saving.
 * @param data - The user data to create.
 * @returns The newly created user object.
 */
export async function createUser(data: UserCreateInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password as string);
  return prisma.user.create({
  });
}

/**
 * Update an existing user's information.
 * @param id - The unique identifier of the user to update.
 * @param data - The data to update.
 * @returns The updated user object.
 */
export async function updateUser(
  id: string,
  data: Partial<Prisma.UserUpdateInput>
  });
}

/**
 * Delete a user from the database by their ID.
 * @param id - The unique identifier of the user to delete.
 * @returns The deleted user object.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Search for users by a queryrized query string.
 * Matches against name, email, or bio fields.
 * @param query - The search query string.
 * @returns A list of matching users.
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {
  });
}

/**
 * Retrieve all users from the database.
 * @returns A list of all users.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}