/**
 * User Service
 * Contains business logic for user-related operations including CRUD operations, authentication,
 * and user management functions.
 */

import { User } from '@prisma/client';
import { prisma } from '../utils/prisma';

/**
 * Finds a user by their unique identifier
 * @param id - The unique identifier of the user
 * @returns Promise resolving to the found user or null if not found
 */
export const findUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns Promise resolving to the found user or null if not found
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });
};

/**
 * Creates a new user with the provided data
 * @param data - The user data to create the new user with
 * @returns Promise resolving to the created user
 */
export const createUser = async (data: any) => {
  return prisma.user.create({ data });
};

/**
 * Updates an existing user's information
 * @param id - The ID of the user to update
 * @param data - The data to update the user with
 * @returns Promise resolving to the updated user
 */
export const updateUser = async (id: string, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a user by their unique identifier
 * @param id - The unique identifier of the user to delete
 * @returns Promise resolving to the deleted user
 */
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};

/**
 * Gets all users from the database
 * @returns Promise resolving to an array of all users
 */
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

/**
 * Finds users by role type
 * @param role - The role to filter users by
 * @returns Promise resolving to an array of users with the specified role
 */
export const findUsersByRole = async (role: string): Promise<User[]> => {
  return prisma.user.findMany({
    where: { role },
  });
};

/**
 * Updates user profile information
 * @param userId - The user ID to update
 * @param profileData - The profile data to update
 * @returns Promise resolving to the updated profile
 */
export const updateUserProfile = async (userId: string, profileData: any) => {
  return prisma.user.update({
    where: { id: userId },
    data: { profile: { update: profileData } },
  });
};

/**
 * Gets user profile information
 * @param userId - The user ID to get profile for
 * @returns Promise resolving to the user's profile data
 */
export const getUserProfile = async (userId: string) => {
  return prisma.profile.findUnique({
    where: { userId },
  });
};