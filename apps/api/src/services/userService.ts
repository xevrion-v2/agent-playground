/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';


const SALT_ROUNDS = 10;

/**
 * Creates a new user in the database.
 * @param data - The user data to create.
 * @param data.email - The user's email address.
 * @param data.password - The user's plain-text password (will be hashed).
 * @param data.name - The user's display name.
 * @returns The created user object.
 */
export async function createUser(data: {
  email: string;
  password: string;
  });
}

/**
 * Retrieves a user by their unique email address.
 * @param email - The email address to search for.
 * @returns The user object if found, otherwise null.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Retrieves a user by their unique ID.
 * @param id - The user's UUID.
 * @returns The user object if found, otherwise null.
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Updates a user's profile information.
 * @param id - The user's UUID.
 * @param data - Partial user data to update.
 * @returns The updated user object.
 */
export async function updateUser(
  id: string,
  data: Partial<Pick<User, 'name' | 'email' | 'avatar'>>
  });
}

/**
 * Permanently deletes a user from the database.
 * @param id - The user's UUID.
 * @returns The deleted user object.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Hashes a plain-text password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password string.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}