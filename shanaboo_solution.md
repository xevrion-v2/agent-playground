 ```diff
--- a/apps/api/src/services/userService.ts
+++ b/apps/api/src/services/userService.ts
@@ -1,3 +1,8 @@
+/**
+ * User service module for managing user-related database operations.
+ * @module services/userService
+ */
+
 import { PrismaClient, User, Prisma } from '@prisma/client';
 import { hashPassword } from '../utils/password';
 import { AppError } from '../utils/errors';
@@ -5,6 +10,13 @@
 const prisma = new PrismaClient();
 
 export const userService = {
+  /**
+   * Retrieves a user by their unique identifier.
+   * @param {string} id - The unique identifier of the user.
+   * @returns {Promise<User | null>} The user object if found, null otherwise.
+   * @throws {AppError} Throws a 404 error if the user is not found.
+   */
   getUserById: async (id: string): Promise<User | null> => {
     const user = await prisma.user.findUnique({
       where: { id },
@@ -17,6 +29,12 @@
     return user;
   },
 
+  /**
+   * Retrieves a user by their email address.
+   * @param {string} email - The email address of the user.
+   * @returns {Promise<User | null>} The user object if found, null otherwise.
+   * @throws {AppError} Throws a 404 error if the user is not found.
+   */
   getUserByEmail: async (email: string): Promise<User | null> => {
     const user = await prisma.user.findUnique({
       where: { email },
@@ -29,6 +47,12 @@
     return user;
   },
 
+  /**
+   * Creates a new user with a hashed password.
+   * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }} data - The user data excluding auto-generated fields.
+   * @returns {Promise<User>} The newly created user object.
+   * @throws {AppError} Throws a 409 error if the email is already in use.
+   */
   createUser: async (
     data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }
   ): Promise<User> => {
@@ -51,6 +75,13 @@
     }
   },
 
+  /**
+   * Updates an existing user's information.
+   * @param {string} id - The unique identifier of the user to update.
+   * @param {Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>} data - The fields to update.
+   * @returns {Promise<User>} The updated user object.
+   * @throws {AppError} Throws a 404 error if the user is not found.
+   */
   updateUser: async (
     id: string,
     data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
@@ -68,6 +99,12 @@
     });
   },
 
+  /**
+   * Deletes a user by their unique identifier.
+   * @param {string} id - The unique identifier of the user to delete.
+   * @returns {Promise<void>} Resolves when the user is deleted.
+   * @throws {AppError} Throws a 404 error if the user is not found.
+   */
   deleteUser: async (id: string): Promise<void> => {
     const user = await prisma.user.findUnique({
       where: { id },
@@ -81,6 +118,11 @@
     await prisma.user.delete({ where: { id } });
   },
 
+  /**
+   * Retrieves a list of users with optional filtering, pagination, and sorting.
+   * @param {Object} params - Query parameters for filtering and pagination.
+   * @returns {Promise<{ users: User[]; total: number }>} A list of users and the total count.
+   */
   listUsers: async (params: {
     page?: number;
     limit?: number;
@@ -110,6 +152,12 @@
     };
   },
 
+  /**
+   * Searches for users by name or email.
+   * @param {string} query - The search query string.
+   * @returns {Promise<User[]>} A list of users matching the search query.
+   * @throws {AppError} Throws a 400 error if the query is empty.
+   */
   searchUsers: async (query: string): Promise<User[]> => {
     if (!query || query.trim().length === 0) {
       throw new AppError('Search query is required', 400);
@@ -131,6 +179,12 @@
     });
   },
 
+  /**
+   * Retrieves a user by their external OAuth provider ID.
+   * @param {string} providerId - The OAuth provider identifier.
+   * @returns {Promise<User | null>} The user object if found, null otherwise.
+   * @throws {AppError} Throws a 404 error if the user is not found.
+   */
   getUserByProviderId: async (providerId: string): Promise<User | null> => {
     const user = await prisma.user.findFirst({
       where: {
@@ -147,6 +201,12 @@
     return user;
   },
 
+  /**
+   * Updates a user's profile image URL.
+   * @param {string} id - The unique identifier of the user.
+   * @param {string} imageUrl - The URL of the new profile image.
+   * @returns {Promise<User>} The updated user object.
+   */
   updateProfileImage: async (id: string, imageUrl: string): Promise<User> => {
     return prisma.user.update({
       where: { id },
@@ -156,6 +216,12 @@
     });
   },
 
+  /**
+   * Verifies a user's email address.
+   * @param {string} id - The unique identifier of the user.
+   * @returns {Promise<User>} The updated user object with emailVerified set to the current date.
+   * @throws {AppError} Throws a 404 error if the user is not found.
+   */
   verifyEmail: async (id: string): Promise<User> => {
     const user = await prisma.user.findUnique({
       where: { id },
@@ -173,6 +239,12 @@
     });
   },
 
+  /**
+   * Updates a user's password after hashing it.
+   * @param {string} id - The unique identifier of the user.
+   * @param {string} password - The new plain text password.
+   * @returns {Promise<User>} The updated user object.
+   */
   updatePassword: async (id: string, password: string): Promise<User> => {
     const hashedPassword = await hashPassword(password