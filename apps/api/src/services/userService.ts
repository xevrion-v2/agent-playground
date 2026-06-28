import { prisma } from '@taskflow/db';
import { hashPassword } from '../utils/auth';

/**
 * Service for managing user-related database operations.
 * Provides CRUD operations and search functionality for users.
 */

/** Data required to create a new user. */
export interface CreateUserInput {
  email: string;
  password: string;
  role?: 'CLIENT' | 'FREELANCER' | 'ADMIN';
}

/** Data allowed when updating an existing user. */
export interface UpdateUserInput {
  name?: string;
  bio?: string;
  isVerified?: boolean;
}

/**
 * Creates a new user in the database with a hashed password.
 * @param data - The user data including email and password.
 * @returns The created user record.
 * @throws Error if a user with the same email already exists.
 */
export async function createUser(data: CreateUserInput) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
  });
}

/**
 * Retrieves all users from the database.
 * @returns An array of all user records.
 */
export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
  });
}

/**
 * Finds a single user by their unique ID.
 * @param id - The user's unique identifier.
 * @returns The user record or null if not found.
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a single user by their email address.
 * @param email - The user's email address.
 * @returns The user record or null if not found.
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Updates a user's information in the database.
 * @param id - The user's unique identifier.
 * @param data - The fields to update.
 * @returns The updated user record.
 * @throws Error if the user is not found.
 */
export async function updateUser(id: string, data: UpdateUserInput) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
  });
}

/**
 * Deletes a user from the database.
 * @param id - The user's unique identifier.
 * @returns The deleted user record.
 * @throws Error if the user is not found.
 */
export async function deleteUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
  });
}

/**
 * Searches for users by name or email matching the given query.
 * @param query - The search string to match against name or email.
 * @returns An array of matching user records.
 */
export async function searchUsers(query: string) {
  return prisma.user.findMany({
    where: {