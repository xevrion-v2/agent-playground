import { prisma } from '@taskflow/db';
import { hashPassword, comparePassword } from '../utils/password';

/**
 * Service for managing user-related operations.
 * Provides CRUD operations and authentication helpers for users.
 */

/** Input data for creating a new user. */
export interface CreateUserInput {
  email: string;
  password: string;
  role?: 'CLIENT' | 'FREELANCER' | 'ADMIN';
}

/** Input data for updating an existing user. */
export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  avatarUrl?: string;
}

/**
 * Creates a new user with a hashed password.
 * @param data - The user data to create.
 * @returns The created user (without password).
 * @throws Error if a user with the same email already exists.
 */
export async function createUser(data: CreateUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  return user;
}

/**
 * Retrieves a user by their unique ID.
 * @param id - The user's ID.
 * @returns The user (without password) or null if not found.
 */
export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  return user;
}

/**
 * Retrieves a user by their email address.
 * @param email - The user's email.
 * @returns The user (without password) or null if not found.
 */
export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  return user;
}

/**
 * Retrieves a user by email with their password included.
 * @param email - The user's email.
 * @returns The user with password or null if not found.
 */
export async function getUserByEmailWithPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  return user;
}

/**
 * Updates a user's information.
 * @param id - The user's ID.
 * @param data - The data to update.
 * @returns The updated user (without password).
 */
export async function updateUser(id: string, data: UpdateUserInput) {
  const user = await prisma.user.update({
    where: { id },
  return user;
}

/**
 * Deletes a user by their ID.
 * @param id - The user's ID.
 * @returns The deleted user (without password).
 */
export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: { id },
  return user;
}

/**
 * Searches for users by name or email.
 * @param query - The search string.
 * @returns A list of matching users (without passwords).
 */
export async function searchUsers(query: string) {
  const users = await prisma.user.findMany({
    where: {
  return users;
}

/**
 * Validates a user's password against a provided plain text password.
 * @param user - The user with a hashed password.
 * @param password - The plain text password to validate.
 * @returns True if the password matches, false otherwise.
 */
export async function validateUserPassword(
  user: { password: string },
  password: string
  return comparePassword(password, user.password);
}

/**
 * Changes a user's password after validating the current password.
 * @param userId - The user's ID.
 * @param newPassword - The new plain text password.
 */
export async function changePassword(userId: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);

  });
}

/**
 * Retrieves a paginated list of users.
 * @param page - The page number (1-based).
 * @param limit - The number of users per page.
 * @returns A list of users (without passwords) and the total count.
 */
export async function getUsersPaginated(page: number, limit: number) {
  const skip = (page - 1) * limit;

  return { users, total };
}

/**
 * Retrieves a user by their ID with their password included.
 * @param id - The user's ID.
 * @returns The user with password or null if not found.
 */
export async function getUserByIdWithPassword(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },