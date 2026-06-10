/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 * @module services/userService
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';


const SALT_ROUNDS = 10;

/**
 * Retrieves all users from the database.
 * Excludes sensitive fields like password hashes.
 * @returns {Promise<User[]>} Array of user objects
 * @throws {Error} If database query fails
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    select: {
  });
}

/**
 * Finds a single user by their unique ID.
 * @param {string} id - The user's UUID
 * @returns {Promise<User | null>} The user object, or null if not found
 * @throws {Error} If database query fails
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a single user by their email address.
 * @param {string} email - The user's email address
 * @returns {Promise<User | null>} The user object, or null if not found
 * @throws {Error} If database query fails
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Creates a new user with a hashed password.
 * @param {Object} data - User creation data
 * @param {string} data.email - User's email address
 * @param {string} data.password - Plain text password (will be hashed)
 * @returns {Promise<User>} The newly created user object
 * @throws {Error} If email already exists or validation fails
 */
export async function createUser(data: {
  email: string;
  password: string;
  });
}

/**
 * Updates an existing user's information.
 * If password is provided, it will be re-hashed.
 * @param {string} id - The user's UUID
 * @param {Partial<User>} data - Partial user data to update
 * @returns {Promise<User>} The updated user object
 * @throws {Error} If user not found or email already exists
 */
export async function updateUser(
  id: string,
  data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & { password?: string }
  });
}

/**
 * Permanently deletes a user from the database.
 * @param {string} id - The user's UUID
 * @returns {Promise<User>} The deleted user object
 * @throws {Error} If user not found
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },