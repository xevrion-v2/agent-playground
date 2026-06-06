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
 import bcrypt from 'bcrypt';
 
@@ -5,6 +11,12 @@
 
 const SALT_ROUNDS = 10;
 
+/**
+ * Hash a plaintext password using bcrypt.
+ * @param {string} password - The plaintext password to hash.
+ * @returns {Promise<string>} The hashed password.
+ * @throws {Error} If hashing fails.
+ */
 export async function hashPassword(password: string): Promise<string> {
   return bcrypt.hash(password, SALT_ROUNDS);
 }
@@ -12,6 +24,13 @@
 export async function comparePassword(password: string, hash: string): Promise<boolean> {
   return bcrypt.compare(password, hash);
 }
 
+/**
+ * Create a new user in the database.
+ * @param {Prisma.UserCreateInput} data - The user data to create.
+ * @returns {Promise<User>} The created user.
+ * @throws {Error} If the email is already taken or creation fails.
+ */
 export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
   if (data.password) {
     data.password = await hashPassword(data.password);
@@ -20,6 +39,12 @@
   return prisma.user.create({ data });
 }
 
+/**
+ * Retrieve a user by their unique ID.
+ * @param {string} id - The user's unique identifier.
+ * @returns {Promise<User | null>} The user if found, otherwise null.
+ */
 export async function getUserById(id: string): Promise<User | null> {
   return prisma.user.findUnique({
     where: { id },
@@ -29,6 +54,12 @@
   });
 }
 
+/**
+ * Retrieve a user by their email address.
+ * @param {string} email - The user's email address.
+ * @returns {Promise<User | null>} The user if found, otherwise null.
+ */
 export async function getUserByEmail(email: string): Promise<User | null> {
   return prisma.user.findUnique({
     where: { email },
@@ -38,6 +69,13 @@
   });
 }
 
+/**
+ * Update a user's information by their ID.
+ * @param {string} id - The user's unique identifier.
+ * @param {Prisma.UserUpdateInput} data - The data to update.
+ * @returns {Promise<User>} The updated user.
+ * @throws {Error} If the user does not exist.
+ */
 export async function updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
   if (data.password) {
     data.password = await hashPassword(data.password as string);
@@ -46,6 +84,12 @@
   return prisma.user.update({ where: { id }, data });
 }
 
+/**
+ * Delete a user from the database by their ID.
+ * @param {string} id - The user's unique identifier.
+ * @returns {Promise<User>} The deleted user.
+ * @throws {Error} If the user does not exist.
+ */
 export async function deleteUser(id: string): Promise<User> {
   return prisma.user.delete({ where: { id } });
 }
@@ -53,6 +97,12 @@
 export async function listUsers(params: {
   skip?: number;
   take?: number;
   cursor?: Prisma.UserWhereUniqueInput;
   where?: Prisma.UserWhereInput;
   orderBy?: Prisma.UserOrderByWithRelationInput;
 } = {}): Promise<User[]> {
   const { skip, take, cursor, where, orderBy } = params;
   return prisma.user.findMany({
     skip,
     take,
     cursor,
     where,
     include: { profile: true, skills: true },
   });
 }
 
+/**
+ * Search for users by a query string (matches name or email).
+ * @param {string} query - The search query.
+ * @param {number} [take=10] - Maximum number of results to return.
+ * @returns {Promise<User[]>} A list of matching users.
+ */
 export async function searchUsers(query: string, take: number = 10): Promise<User[]> {
   return prisma.user.findMany({
     where: {
@@ -75,6 +125,12 @@
   });
 }
 
+/**
+ * Verify a user's email address.
+ * @param {string} id - The user's unique identifier.
+ * @returns {Promise<User>} The updated user with verified email.
+ * @throws {Error} If the user does not exist.
+ */
 export async function verifyUserEmail(id: string): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -82,6 +138,12 @@
   });
 }
 
+/**
+ * Update a user's last login timestamp to now.
+ * @param {string} id - The user's unique identifier.
+ * @returns {Promise<User>} The updated user.
+ * @throws {Error} If the user does not exist.
+ */
 export async function updateLastLogin(id: string): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -89,6 +151,13 @@
   });
 }
 
+/**
+ * Change a user's password after verifying the current password.
+ * @param {string} id - The user's unique identifier.
+ * @param {string} currentPassword - The user's current plaintext password.
+ * @param {string} newPassword - The new plaintext password to set.
+ * @returns {Promise<User>} The updated user.
+ * @throws {Error} If the current password is incorrect or the user does not exist.
+ */
 export async function changePassword(
   id: string,
   currentPassword: string,
@@ -105,6 +174,12 @@
   return updateUser(id, { password: newPassword });
 }
 
+/**
+ * Toggle a user's active status (soft disable/enable).
+ * @param {string} id - The user's unique identifier.
+ * @param {boolean} isActive - Whether the user should be active.
+ * @returns {Promise<User>} The updated user.
+ * @throws {Error} If the user does not exist.
+ */
 export async function setUserActiveStatus(id: string, isActive: boolean): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -112,6 +187,12 @@
   });
 }
 
+/**
+ * Retrieve a user with all related data (profile, skills, tasks, etc.).
+ * @param {string} id - The user's unique identifier.
+ * @returns {Promise<User | null>} The user with full relations if found, otherwise null.
+ */
 export async function getUserWithRelations(id: string):