/**
 * User service containing business logic for user operations
 * @module services/userService
 */

import { User } from '@prisma/client';
import { prisma } from '../utils/database';

/**
 * Find a user by their ID
 * @param {number} id - The unique identifier of the user
 * @returns {Promise<User | null>} The user object or null if not found
 */
export async function findUserById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id }
 });
}

/**
 * Find a user by their email address
 * @param {string} email - The email address of the user
 * @returns {Promise<User | null>} The user object or null if not found
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email }
  });
}

/**
 * Create a new user
 * @param {Object} userData - The user data to create
 * @param {string} userData.name - The name of the user
 * @param {string} userData.email - The email of the user
 * @param {string} userData.password - The password for the user
 * @returns {Promise<User>} The created user object
 */
export async function createUser(userData: { name: string; email: string; password: string }): Promise<User> {
  // Hash password before saving
  const hashedPassword = userData.password; // In real implementation, this would be properly hashed
  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    }
  });
}

/**
 * Update an existing user
 * @param {number} id - The ID of the user to update
 * @param {Partial<User>} userData - The partial user data to update
 * @returns {Promise<User>} The updated user object
 */
export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: userData
  });
}

export default { findUserById, findUserByEmail, createUser, updateUser };