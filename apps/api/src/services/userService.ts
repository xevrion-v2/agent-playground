/**
 * User service - handles business logic for user-related operations.
 * Provides CRUD operations and search functionality for users.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type CreateUserInput = Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'role'>;

/**
 * Creates a new user with a hashed password.
 * @param data - The user data to create.
 * @returns The created user object.
 * @throws Error if the user cannot be created.
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
  });
}

/**
 * Retrieves all users from the database.
 * @returns An array of all users.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
  id: true;
};

/**
 * Finds a single user by their unique ID.
 * @param id - The user's unique identifier.
 * @returns The user object or null if not found.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a single user by their email address.
 * @param email - The user's email address.
 * @returns The user object or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Updates a user's information by ID.
 * @param id - The user's unique identifier.
 * @param data - Partial user data to update.
 * @returns The updated user object.
 * @throws Error if the user does not exist.
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return prisma.user.update({
    where: { id },
  });
}

/**
 * Deletes a user by their ID.
 * @param id - The user's unique identifier.
 * @returns The deleted user object.
 * @throws Error if the user does not exist.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
}

type SearchUsersInput = {
/**
 * Searches for users by name or email matching the given query.
 * @param query - The search string to match against user names and emails.
 * @returns An array of matching users, limited to 20 results.
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {