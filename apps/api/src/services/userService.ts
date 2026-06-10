import { prisma } from '@taskflow/db';
import { hashPassword, comparePassword } from '../utils/password';

/**
 * Service for managing user-related operations.
 * Provides functions for CRUD operations, authentication,
 * and user profile management.
 */

export interface CreateUserInput {
  email: string;
  password: string;
  role?: 'CLIENT' | 'FREELANCER' | 'ADMIN';
}

/**
 * Creates a new user with a hashed password.
 * @param {CreateUserInput} data - The user data including email and password.
 * @returns {Promise<User>} The created user object.
 * @throws {Error} If a user with the same email already exists.
 */

export async function createUser(data: CreateUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
}

/**
 * Retrieves a user by their unique ID.
 * @param {string} id - The user's ID.
 * @returns {Promise<User | null>} The user object, or null if not found.
 */

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Retrieves a user by their email address.
 * @param {string} email - The user's email.
 * @returns {Promise<User | null>} The user object, or null if not found.
 */

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Updates a user's information.
 * @param {string} id - The user's ID.
 * @param {UpdateUserInput} data - The data to update.
 * @returns {Promise<User>} The updated user object.
 */

export async function updateUser(id: string, data: UpdateUserInput) {
  const updateData: any = { ...data };

  });
}

/**
 * Deletes a user by their ID.
 * @param {string} id - The user's ID.
 * @returns {Promise<User>} The deleted user object.
 */

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
}

import type { User } from '@prisma/client';

/**
 * Validates a user's credentials.
 * @param {string} email - The user's email.
 * @param {string} password - The plain text password to verify.
 * @returns {Promise<User | null>} The user object if valid, or null if invalid.
 */

export async function validateUserCredentials(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
  return user;
}

/**
 * Searches for users by a query string matching name or email.
 * @param {string} query - The search query.
 * @returns {Promise<User[]>} A list of matching users.
 */

export async function searchUsers(query: string) {
  return prisma.user.findMany({
    where: {
  });
}

/**
 * Retrieves all users (admin use).
 * @returns {Promise<User[]>} A list of all users.
 */

export async function getAllUsers() {
  return prisma.user.findMany({
    select: {