/**
 * User Service
 * Handles business logic for user management operations
 */

import { User } from '@prisma/client';
import { db } from '../../packages/db';

/**
 * Creates a new user in the system
 * @param userData - The user data to create
 * @returns Promise resolving to the created user
 */
export async function createUser(userData: Partial<User>) {
  return await db.user.create({
    data: userData
  });
}

/**
 * Finds a user by their unique identifier
 * @param id - The unique identifier of the user
 * @returns Promise resolving to the found user or null
 */
export async function findUserById(id: string) {
  return await db.user.findUnique({
    where: { id }
  });
}

/**
 * Finds a user by their email address
 * @param email - The email address to search for
 * @returns Promise resolving to the found user or null
 */
export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email }
  });
}

/**
 * Updates a user's information
 * @param id - The ID of the user to update
 * @param updateData - The data to update the user with
 * @returns Promise resolving to the updated user
 */
export async function updateUser(id: string, updateData: Partial<User>) {
  return await db.user.update({
    where: { id },
    data: updateData
  });
}

/**
 * Deletes a user from the system
 * @param id - The ID of the user to delete
 * @returns Promise resolving to the deleted user
 */
export async function deleteUser(id: string) {
  return await db.user.delete({
    where: { id }
  });
}

/**
 * Lists all users in the system
 * @returns Promise resolving to array of users
 */
export async function listUsers() {
  return await db.user.findMany();
}

/**
 * Finds users by role
 * @param role - The role to filter users by
 * @returns Promise resolving to array of users with the specified role
 */
export async function findUsersByRole(role: string) {
  return await db.user.findMany({
    where: { role }
  });
}

/**
 * Searches for users by name or email
 * @param searchTerm - The term to search for in user names or emails
 * @returns Promise resolving to array of matching users
 */
export async function searchUsers(searchTerm: string) {
  return await db.user.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm } },
        { email: { contains: searchTerm } }
      ]
    }
  });
}

/**
 * Gets user profile information
 * @param id - The user ID to retrieve profile for
 * @returns Promise resolving to user profile data
 */
export async function getUserProfile(id: string) {
  return await db.user.findUnique({
    where: { id },
    include: {
      profile: true
    }
  });
}

/**
 * Updates user profile information
 * @param id - The user ID to update profile for
 * @param profileData - The profile data to update
 * @returns Promise resolving to updated user
 */
export async function updateUserProfile(id: string, profileData: any) {
  return await db.user.update({
    where: { id },
    data: { profile: profileData }
  });
}

/**
 * Creates a user with profile data
 * @param userData - The user data including profile information
 * @param profileData - The profile information for the new user
 * @returns Promise resolving to the created user with profile
 */
export async function createUserWithProfile(userData: any, profileData: any) {
  return await db.user.create({
    data: {
      ...userData,
      profile: profileData
    }
  });
}

/**
 * Finds users with pagination
 * @param page - Page number (1-indexed)
 * @param limit - Number of users per page
 * @returns Promise resolving to paginated users
 */
export async function listUsersPaginated(page: number, limit: number) {
  return await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit
  });
}

/**
 * Updates user status (active/inactive)
 * @param id - The user ID to update status for
 * @param active - The active status to set
 * @returns Promise resolving to updated user
 */
export async function updateUserStatus(id: string, active: boolean) {
  return await db.user.update({
    where: { id },
    data: { active }
  });
}

/**
 * Finds users by status
 * @param active - The active status to filter by
 * @returns Promise resolving to array of users with matching status
 */
export async function findUsersByStatus(active: boolean) {
  return await db.user.findMany({
    where: { active }
  });
}