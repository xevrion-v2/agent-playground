import { PrismaClient, User } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../types/user';

/**
 * Service for managing user-related database operations.
 * Provides CRUD functionality for user records.
 * @module services/userService
 */

const prisma = new PrismaClient();

/**
 * @param data - The user data to create
 * @returns The created user
 */
/**
 * Creates a new user in the database.
 * @param data - The user data including email, password, and profile information
 * @returns Promise resolving to the created User
 * @throws Error if a user with the same email already exists
 */
export async function createUser(data: CreateUserInput): Promise<User> {
  return prisma.user.create({ data });
}
 * @param id - The user ID
 * @returns The user or null if not found
 */
/**
 * Retrieves a single user by their unique ID.
 * @param id - The UUID of the user to find
 * @returns Promise resolving to the User or null if not found
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
 * Get a user by email
 * @param email - The user's email
 * @returns The user or null if not found
/**
 * Retrieves a single user by their email address.
 * @param email - The email address to search for
 * @returns Promise resolving to the User or null if not found
 */
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
 * Get all users
 * @returns Array of users
 */
/**
 * Retrieves all users from the database.
 * @returns Promise resolving to an array of all Users
 * @note Consider adding pagination for large datasets
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
 * @param id - The user ID
 * @param data - The data to update
 * @returns The updated user
/**
 * Updates an existing user's information.
 * @param id - The UUID of the user to update
 * @param data - Partial user data to apply
 * @returns Promise resolving to the updated User
 * @throws Error if the user does not exist
 */
 */
export async function updateUser(id: string, data: UpdateUserInput): Promise<User> {
  return prisma.user.update({ where: { id }, data });
 * Delete a user
 * @param id - The user ID
 * @returns The deleted user
/**
 * Permanently removes a user from the database.
 * @param id - The UUID of the user to delete
 * @returns Promise resolving to the deleted User record
 * @throws Error if the user does not exist
 */
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });