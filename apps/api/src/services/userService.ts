/**
 * User service - handles business logic for user-related operations.
 * Provides CRUD operations and search functionality for users.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


export type UserCreateInput = Prisma.UserCreateInput;

/**
 * Retrieve a single user by their unique ID.
 * @param id - The unique identifier of the user
 * @returns The user object, or null if not found
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieve a single user by their email address.
 * @param email - The email address of the user
 * @returns The user object, or null if not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Create a new user in the database.
 * Hashes the password before storing.
 * @param data - The user data to create
 * @returns The newly created user object
 */
export async function createUser(data: UserCreateInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password as string);
  return prisma.user.create({
  });
}

/**
 * Update an existing user's information.
 * @param id - The unique identifier of the user to update
 * @param data - The user data to update
 * @returns The updated user object
 * @throws Error if the user is not found
 */
export async function updateUser(id: string, data: Partial<UserCreateInput>): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
  });
}

/**
 * Delete a user from the database.
 * @param id - The unique identifier of the user to delete
 * @returns The deleted user object
 * @throws Error if the user is not found
 */
export async function deleteUser(id: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
  });
}

/**
 * Search for users by name or email.
 * Returns paginated results ordered by creation date.
 * @param query - The search string to match against name or email
 * @param page - The page number for pagination (1-based)
 * @param limit - The number of results per page
 * @returns An array of matching user objects
 */
export async function searchUsers(
  query: string,
  page: number = 1,
  });
}

/**
 * Retrieve all users from the database.
 * Primarily used for admin or internal purposes.
 * @returns An array of all user objects
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    include: { profile: true, skills: true },