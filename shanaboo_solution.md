 ```diff
--- a/apps/api/src/services/userService.ts
+++ b/apps/api/src/services/userService.ts
@@ -1,3 +1,8 @@
+/**
+ * User service module.
+ * Provides CRUD operations and business logic for user management.
+ */
+
 import { PrismaClient, User, Prisma } from '@prisma/client';
 import bcrypt from 'bcrypt';
 
@@ -5,6 +10,12 @@
 
 const SALT_ROUNDS = 10;
 
+/**
+ * Retrieves all users from the database.
+ * @param {Omit<Prisma.UserFindManyArgs, 'select' | 'include'>} [args] - Optional query arguments for filtering, pagination, and sorting.
+ * @returns {Promise<User[]>} A promise that resolves to an array of users.
+ * @throws {Error} If the database query fails.
+ */
 export async function getAllUsers(
   args?: Omit<Prisma.UserFindManyArgs, 'select' | 'include'>
 ): Promise<User[]> {
@@ -12,6 +23,12 @@
   return users;
 }
 
+/**
+ * Retrieves a single user by their unique ID.
+ * @param {string} id - The unique identifier of the user.
+ * @returns {Promise<User | null>} A promise that resolves to the user if found, or null if not found.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUserById(id: string): Promise<User | null> {
   const user = await prisma.user.findUnique({
     where: { id },
@@ -19,6 +36,12 @@
   return user;
 }
 
+/**
+ * Retrieves a single user by their email address.
+ * @param {string} email - The email address of the user.
+ * @returns {Promise<User | null>} A promise that resolves to the user if found, or null if not found.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUserByEmail(email: string): Promise<User | null> {
   const user = await prisma.user.findUnique({
     where: { email },
@@ -26,6 +49,12 @@
   return user;
 }
 
+/**
+ * Creates a new user with a hashed password.
+ * @param {Prisma.UserCreateInput} data - The user data to create.
+ * @returns {Promise<User>} A promise that resolves to the newly created user.
+ * @throws {Error} If the email is already taken or the database operation fails.
+ */
 export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
   const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
   
@@ -40,6 +69,14 @@
   return user;
 }
 
+/**
+ * Updates an existing user's information.
+ * @param {string} id - The unique identifier of the user to update.
+ * @param {Prisma.UserUpdateInput} data - The user data to update.
+ * @returns {Promise<User>} A promise that resolves to the updated user.
+ * @throws {Error} If the user is not found or the database operation fails.
+ */
 export async function updateUser(
   id: string,
   data: Prisma.UserUpdateInput
@@ -55,6 +92,12 @@
   return user;
 }
 
+/**
+ * Deletes a user from the database.
+ * @param {string} id - The unique identifier of the user to delete.
+ * @returns {Promise<User>} A promise that resolves to the deleted user.
+ * @throws {Error} If the user is not found or the database operation fails.
+ */
 export async function deleteUser(id: string): Promise<User> {
   const user = await prisma.user.delete({
     where: { id },
@@ -62,6 +105,13 @@
   return user;
 }
 
+/**
+ * Verifies a user's password against the stored hash.
+ * @param {string} plainPassword - The plain text password to verify.
+ * @param {string} hashedPassword - The hashed password stored in the database.
+ * @returns {Promise<boolean>} A promise that resolves to true if the password matches, false otherwise.
+ * @throws {Error} If the comparison operation fails.
+ */
 export async function verifyPassword(
   plainPassword: string,
   hashedPassword: string
@@ -70,6 +120,13 @@
   return isMatch;
 }
 
+/**
+ * Changes a user's password after verifying the current password.
+ * @param {string} userId - The unique identifier of the user.
+ * @param {string} currentPassword - The user's current plain text password.
+ * @param {string} newPassword - The new password to set.
+ * @returns {Promise<User>} A promise that resolves to the updated user.
+ * @throws {Error} If the current password is incorrect or the database operation fails.
+ */
 export async function changePassword(
   userId: string,
   currentPassword: string,
@@ -91,6 +148,12 @@
   return updatedUser;
 }
 
+/**
+ * Searches for users by name or email.
+ * @param {string} query - The search query string.
+ * @returns {Promise<User[]>} A promise that resolves to an array of matching users.
+ * @throws {Error} If the database query fails.
+ */
 export async function searchUsers(query: string): Promise<User[]> {
   const users = await prisma.user.findMany({
     where: {
@@ -106,6 +169,12 @@
   return users;
 }
 
+/**
+ * Retrieves a paginated list of users.
+ * @param {number} page - The page number (1-based).
+ * @param {number} pageSize - The number of users per page.
+ * @returns {Promise<{ users: User[]; total: number; totalPages: number }>} A promise that resolves to paginated user data.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUsersPaginated(
   page: number,
   pageSize: number
@@ -126,6 +195,12 @@
   };
 }
 
+/**
+ * Retrieves users by their role.
+ * @param {string} role - The role to filter by (e.g., 'CLIENT', 'FREELANCER', 'ADMIN').
+ * @returns {Promise<User[]>} A promise that resolves to an array of users with the specified role.
+ * @throws {Error} If the database query fails.
+ */
 export async function getUsersByRole(role: string): Promise<User[]> {
   const users = await prisma.user.findMany({
     where: {
@@ -135,6 +210,12 @@
   return users;
 }
 
+/**
+ * Soft deletes a user by setting their active status to false.
+ * @param {string} id - The unique identifier of the user to deactivate.
+ * @returns {Promise<User>} A promise that resolves to the deactivated user