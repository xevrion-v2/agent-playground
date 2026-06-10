/**
 * User service module.
 * Provides CRUD operations and business logic for user management.
 * @module services/userService
 */

import { PrismaClient, User, Prisma } from '@prisma/client';
import { hashPassword } from '../utils/password';


type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of all users.
 * @throws {Error} If the database query fails.
 */
export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
type GetUserByIdOptions = {
  includeProfile?: boolean;
};

/**
 * Finds a single user by their unique identifier.
 * @param {string} id - The unique identifier of the user.
 * @param {GetUserByIdOptions} [options] - Optional query parameters.
 * @returns {Promise<User | null>} A promise that resolves to the user object, or null if not found.
 */
export async function getUserById(
  id: string,
  options: GetUserByIdOptions = {}
  });
}

/**
 * Finds a single user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<User | null>} A promise that resolves to the user object, or null if not found.
 * @throws {Error} If the database query fails.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
}

type CreateUserData = Prisma.UserCreateInput;

/**
 * Creates a new user in the database.
 * Hashes the provided password before storage.
 * @param {CreateUserData} data - The user data to create.
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 * @throws {Error} If the email is already taken or the database operation fails.
 */
export async function createUser(data: CreateUserData): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
}

type UpdateUserData = Prisma.UserUpdateInput;

/**
 * Updates an existing user's information.
 * @param {string} id - The unique identifier of the user to update.
 * @param {UpdateUserData} data - The partial user data to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 * @throws {Error} If the user is not found or the database operation fails.
 */
export async function updateUser(id: string, data: UpdateUserData): Promise<User> {
  return prisma.user.update({
    where: { id },
  });
}

/**
 * Permanently removes a user from the database.
 * @param {string} id - The unique identifier of the user to delete.
 * @returns {Promise<User>} A promise that resolves to the deleted user.
 * @throws {Error} If the user is not found or the database operation fails.
 */
export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id },
}

type SearchUsersOptions = {
  /**
   * Searches for users by name or email with pagination.
   * @param {string} query - The search string to match against user names and emails.
   * @param {SearchUsersOptions} [options] - Optional pagination parameters.
   * @returns {Promise<User[]>} A promise that resolves to an array of matching users.
   * @throws {Error} If the database query fails.
   */
  skip?: number;
  take?: number;
};
  });
}

/**
 * Retrieves a user's public profile information.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<{ user: User; profile: any } | null>} A promise that resolves to the user and their profile, or null if not found.
 * @throws {Error} If the database query fails.
 */
export async function getUserProfile(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  return { user, profile: user.profile };
}

/**
 * Updates a user's profile information.
 * @param {string} id - The unique identifier of the user.
 * @param {any} profileData - The profile data to update or create.
 * @returns {Promise<any>} A promise that resolves to the updated profile.
 * @throws {Error} If the user is not found or the database operation fails.
 */
export async function updateUserProfile(id: string, profileData: any) {
  return prisma.profile.upsert({
    where: { userId: id },
}

type FindUsersBySkillOptions = SearchUsersOptions;

/**
 * Finds users who have a specific skill.
 * @param {string} skillName - The name of the skill to search for.
 * @param {FindUsersBySkillOptions} [options] - Optional pagination parameters.
 * @returns {Promise<User[]>} A promise that resolves to an array of users with the specified skill.
 */
export async function findUsersBySkill(
  skillName: string,
  options: FindUsersBySkillOptions = {}
  });
}

/**
 * Retrieves a summary of a user's activity including task counts and ratings.
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<{ totalTasks: number; completedTasks: number; averageRating: number | null }>} A promise that resolves to the user's activity summary.
 * @throws {Error} If the user is not found or the database query fails.
 */
export async function getUserActivitySummary(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },