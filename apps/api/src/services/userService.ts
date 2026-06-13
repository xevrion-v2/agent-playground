/**
 * User service module - handles business logic for user-related operations.
 * @module services/userService
 */

import { PrismaClient, User, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';


const SALT_ROUNDS = 10;

/**
 * Find a user by their email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} The user if found, otherwise null.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Find a user by their unique ID.
 * @param {string} id - The user ID to search for.
 * @returns {Promise<User | null>} The user if found, otherwise null.
 */
export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Create a new user with a hashed password.
 * @param {Object} data - The user data.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's plain-text password.
 * @param {string} data.firstName - The user's first name.
 * @param {string} data.lastName - The user's last name.
 * @param {UserRole} [data.role] - The user's role (defaults to CLIENT).
 * @returns {Promise<User>} The newly created user.
 */
export async function createUser(data: {
  email: string;
  password: string;
  });
}

/**
 * Update a user's profile information.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<Pick<User, 'firstName' | 'lastName' | 'bio' | 'skills' | 'hourlyRate'>>} data - The fields to update.
 * @returns {Promise<User>} The updated user.
 */
export async function updateUserProfile(
  id: string,
  data: Partial<Pick<User, 'firstName' | 'lastName' | 'bio' | 'skills' | 'hourlyRate'>>
  return prisma.user.update({ where: { id }, data });
}

/**
 * Verify a user's plain-text password against their stored hash.
 * @param {User} user - The user whose password to verify.
 * @param {string} password - The plain-text password to check.
 * @returns {Promise<boolean>} True if the password matches, false otherwise.
 */
export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}