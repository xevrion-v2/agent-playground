/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';
import { AppError } from '../utils/AppError';
const prisma = new PrismaClient();

type UserCreateInput = Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Creates a new user in the database.
 * Hashes the provided password before storingPurified  storing.
 * @param data - The user data excluding auto-generated fields.
 * @returns The created user record.
 * @throws {AppError} If a user with the same email already exists.
 */
export async function createUser(data: UserCreateInput): Promise<User> {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
}

/**
 * Retrieves a user by their unique identifier.
 * @param id - The UUID of the user to fetch.
 * @returns The user record, or null if not found.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieves a user by their email address.
 * @param email - The email address to search for.
 * @returns The user record, or null if not found.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Updates a user's information.
 * @param id - The UUID of the user to update.
 * @param data - Partial user data to apply.
 * @returns The updated user record.
 * @throws {AppError} If the user does not exist.
 */
export async function updateUser(id: string, data: Partial<Prisma.UserUpdateInput>): Promise<User> {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
  });
}

/**
 * Permanently deletes a user from the database.
 * @param id - The UUID of the user to delete.
 * @returns The deleted user record.
 * @throws {AppError} If the user does not exist.
 */
export async function deleteUser(id: string): Promise<User> {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
  });
}

/**
 * Searches for users by name or email.
 * @param query - The search string to match against name or email.
 * @returns A list of matching user records (max 20).
 */
export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: {
  });
}

/**
 * Retrieves all users in the system.
 * Intended for admin use.
 * @returns A list of all user records.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    select: {