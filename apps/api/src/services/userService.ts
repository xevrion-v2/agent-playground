import { User } from '@prisma/client';
import { prisma } from '../lib/prisma';

/**
 * Service for managing users
 * Contains business logic for user operations
 */

/**
 * Finds a user by their ID
 * @param id - The unique identifier of the user
 * @returns A promise that resolves to the user object or null if not found
 */
export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns A promise that resolves to the user object or null if not found
 */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Creates a new user with the provided data
 * @param data - The user data to create
 * @returns A promise that resolves to the created user object
 */
export async function createUser(data: Omit<User, 'id'>) {
  return prisma.user.create({
    data,
  });
}

/**
 * Updates a user's information
 * @param id - The ID of the user to update
 * @param data - The partial user data to update
 * @returns A promise that resolves to the updated user object
 */
export async function updateUser(id: string, data: Partial<User>) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a user by their ID
 * @param id - The ID of the user to delete
 * @returns A promise that resolves to the deleted user object
 */
export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Finds all users in the system
 * @returns A promise that resolves to an array of all users
 */
export async function findAllUsers() {
  return prisma.user.findMany();
}

/**
 * Searches for users by name or email
 * @param query - The search term to match against user names or emails
 * @returns A promise that resolves to an array of matching users
 */
export async function searchUsers(query: string) {
  return prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { email: { contains: query } },
      ],
    },
  });
}

/**
 * Updates a user's profile information
 * @param id - The ID of the user to update
 * @param profileData - The profile data to update
 * @returns A promise that resolves to the updated user object
 */
export async function updateProfile(id: string, profileData: Partial<User>) {
  return prisma.user.update({
    where: { id },
    data: profileData,
  });
}