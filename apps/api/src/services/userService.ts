/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 */

import { PrismaClient, User } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Finds a user by their email address.
 * @param {string} email - The email address to search for.
 * @returns {Promise<User | null>} The user if found, null otherwise.
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Finds a user by their unique ID.
 * @param {string} id - The UUID of the user to find.
 * @returns {Promise<User | null>} The user if found, null otherwise.
 */
export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Creates a new user with a hashed password.
 * @param {string} email - The email address for the new user.
 * @param {string} password - The plain text password to hash and store.
  });
}

/**
 * Authenticates a user by email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The plain text password to verify.
 * @returns {Promise<{ user: User; token: string } | null>} An object containing the user and JWT token if authentication succeeds, null otherwise.
 */
export async function authenticateUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return null;

  const token = generateToken(user);
  return { user, token };
}

/**
 * Updates a user's profile information.
 * @param {string} id - The UUID of the user to update.
 * @param {Partial<User>} data - An object containing the fields to update.
  return prisma.user.update({ where: { id }, data });
}

/**
 * Deletes a user from the database.
 * @param {string} id - The UUID of the user to delete.
 * @returns {Promise<User>} The deleted user record.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

/**
 * Searches for users by name or email (case-insensitive).
 * @param {string} query - The search string to match against name or email.
 * @returns {Promise<User[]>} An array of matching users.
    ],
  });
}

/**
 * Updates a user's password after hashing.
 * @param {string} id - The UUID of the user.
 * @param {string} newPassword - The new plain text password to hash and store.
 * @returns {Promise<User>} The updated user record.
 */
export async function updatePassword(id: string, newPassword: string): Promise<User> {
  const hashedPassword = await hashPassword(newPassword);
  return prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
}