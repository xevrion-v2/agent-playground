 ``` Cypress
```diff
--- a/apps/api/src/services/userService.ts
+++ b/apps/api/src/services/userService.ts
@@ -1,3 +1,9 @@
+/**
+ * User service module.
+ * Provides CRUD operations and business logic for user management.
+ * @module services/userService
+ */
+
 import { PrismaClient, User, Prisma } from '@prisma/client';
 import { hashPassword } from '../utils/password';
 
@@ -5,6 +11,13 @@
 
 type CreateUserInput = Prisma.UserCreateInput;
 
+/**
+ * Retrieves a user by their unique identifier.
+ * @param {string} id - The unique identifier of the user.
+ * @returns {Promise<User | null>} The user object if found, null otherwise.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUserById(id: string): Promise<User | null> {
   return prisma.user.findUnique({
     where: { id },
@@ -12,6 +25,13 @@
   });
 }
 
+/**
+ * Retrieves a user by their email address.
+ * @param {string} email - The email address of the user.
+ * @returns {Promise<User | null>} The user object if found, null otherwise.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUserByEmail(email: string): Promise<User | null> {
   return prisma.user.findUnique({
     where: { email },
@@ -19,6 +39,13 @@
   });
 }
 
+/**
+ * Creates a new user in the database.
+ * @param {CreateUserInput} data - The user data to create.
+ * @returns {Promise<User>} The newly created user object.
+ * @throws {Error} If the email is already taken or the database query fails.
+ */
 export async function createUser(data: CreateUserInput): Promise<User> {
   const { password, ...rest } = data;
   const hashedPassword = password ? await hashPassword(password) : undefined;
@@ -33,6 +60,14 @@
   });
 }
 
+/**
+ * Updates an existing user's information.
+ * @param {string} id - The unique identifier of the user to update.
+ * @param {Prisma.UserUpdateInput} data - The user data to update.
+ * @returns {Promise<User>} The updated user object.
+ * @throws {Error} If the user is not found or the database query fails.
+ */
 export async function updateUser(
   id: string,
   data: Prisma.UserUpdateInput
@@ -47,6 +82,12 @@
   });
 }
 
+/**
+ * Deletes a user from the database.
+ * @param {string} id - The unique identifier of the user to delete.
+ * @returns {Promise<User>} The deleted user object.
+ * @throws {Error} If the user is not found or the database query fails.
+ */
 export async function deleteUser(id: string): Promise<User> {
   return prisma.user.delete({
     where: { id },
@@ -54,6 +95,12 @@
   });
 }
 
+/**
+ * Retrieves a list of users with optional filtering and pagination.
+ * @param {Prisma.UserFindManyArgs} [args] - Optional query arguments for filtering, sorting, and pagination.
+ * @returns {Promise<User[]>} A list of user objects.
+ * @throws {Error} If the database query fails.
+ */
 export async function listUsers(
   args?: Prisma.UserFindManyArgs
 ): Promise<User[]> {
@@ -63,6 +110,13 @@
   });
 }
 
+/**
+ * Retrieves a paginated list of users with total count.
+ * @param {number} [page=1] - The page number to retrieve (1-indexed).
+ * @param {number} [pageSize=20] - The number of users per page.
+ * @returns {Promise<{ users: User[]; total: number; page: number; pageSize: number }>} Object containing users and pagination metadata.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUsersPaginated(
   page: number = 1,
   pageSize: number = 20
@@ -82,6 +136,13 @@
   };
 }
 
+/**
+ * Searches for users by name or email using a case-insensitive search.
+ * @param {string} query - The search query string.
+ * @param {number} [limit=10] - The maximum number of results to return.
+ * @returns {Promise<User[]>} A list of matching user objects.
+ * @throws {Error} If the database query fails.
+ */
 export async function searchUsers(
   query: string,
   limit: number = 10
@@ -101,6 +162,12 @@
   });
 }
 
+/**
+ * Retrieves a user by their external OAuth provider ID.
+ * @param {string} providerId - The external provider's user ID.
+ * @returns {Promise<User | null>} The user object if found, null otherwise.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUserByProviderId(
   providerId: string
 ): Promise<User | null> {
@@ -113,6 +180,13 @@
   });
 }
 
+/**
+ * Updates a user's profile information.
+ * @param {string} id - The unique identifier of the user.
+ * @param {object} profileData - The profile data to update.
+ * @returns {Promise<User>} The updated user object.
+ * @throws {Error} If the user is not found or the database query fails.
+ */
 export async function updateUserProfile(
   id: string,
   profileData: {
@@ -136,6 +210,12 @@
   });
 }
 
+/**
+ * Verifies a user's email address.
+ * @param {string} id - The unique identifier of the user.
+ * @returns {Promise<User>} The updated user object with verified email.
+ * @throws {Error} If the user is not found or the database query fails.
+ */
 export async function verifyUserEmail(id: string): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -146,6 +226,12 @@
   });
 }
 
+/**
+ * Checks if a user has a specific role.
+ * @param {string} id - The unique identifier of the user.
+ * @param {string} role - The role to check for.
+ * @returns {Promise<boolean>} True if the user has the role, false otherwise.
+ * @throws {Error} If the user is not found or the database query fails.
+ */
 export async function userHasRole(
   id: string,
   role: string
@@ -156,6 +242,13 @@
   return user?.role === role;
 }
 
+/**
+ * Retrieves a user's public profile information (excludes sensitive data