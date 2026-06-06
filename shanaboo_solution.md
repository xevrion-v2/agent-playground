 ```diff
--- a/apps/api/src/services/userService.ts
+++ b/apps/api/src/services/userService.ts
@@ -1,3 +1,8 @@
+/**
+ * User Service
+ * Handles business logic for user-related operations.
+ */
+
 import { PrismaClient, User } from '@prisma/client';
 import { hashPassword, comparePassword } from '../utils/password';
 import { generateToken } from '../utils/jwt';
@@ -7,6 +12,13 @@
 
 const prisma = new PrismaClient();
 
+/**
+ * Create a new user account.
+ * @param data - The user registration data.
+ * @param data.email - The user's email address.
+ * @param data.password - The user's plain text password.
+ * @returns The newly created user without the password hash.
+ */
 export async function createUser(data: CreateUserInput): Promise<Omit<User, 'passwordHash'>> {
   const passwordHash = await hashPassword(data.password);
   
@@ -23,6 +35,12 @@
   });
 }
 
+/**
+ * Authenticate a user with email and password.
+ * @param email - The user's email address.
+ * @param password - The user's plain text password.
+ * @returns The user object and a JWT token if credentials are valid.
+ */
 export async function loginUser(email: string, password: string): Promise<{ user: Omit<User, 'passwordHash'>; token: string } | null> {
   const user = await prisma.user.findUnique({
     where: { email },
@@ -42,6 +60,11 @@
   return { user: { ... }, token };
 }
 
+/**
+ * Find a user by their unique ID.
+ * @param id - The user's UUID.
+ * @returns The user without the password hash, or null if not found.
+ */
 export async function getUserById(id: string): Promise<Omit<User, 'passwordHash'> | null> {
   return prisma.user.findUnique({
     where: { id },
@@ -49,6 +72,11 @@
   });
 }
 
+/**
+ * Find a user by their email address.
+ * @param email - The user's email address.
+ * @returns The user without the password hash, or null if not found.
+ */
 export async function getUserByEmail(email: string): Promise<Omit<User, 'passwordHash'> | null> {
   return prisma.user.findUnique({
     where: { email },
@@ -56,6 +84,12 @@
   });
 }
 
+/**
+ * Update a user's profile information.
+ * @param id - The user's UUID.
+ * @param data - The fields to update.
+ * @returns The updated user without the password hash.
+ */
 export async function updateUser(id: string, data: UpdateUserInput): Promise<Omit<User, 'passwordHash'>> {
   return prisma.user.update({
     where: { id },
@@ -64,6 +98,11 @@
   });
 }
 
+/**
+ * Delete a user account permanently.
+ * @param id - The user's UUID.
+ * @returns The deleted user without the password hash.
+ */
 export async function deleteUser(id: string): Promise<Omit<User, 'passwordHash'>> {
   return prisma.user.delete({
     where: { id },
@@ -71,6 +110,11 @@
   });
 }
 
+/**
+ * Search for users by name or email.
+ * @param query - The search string to match against name or email.
+ * @returns A list of matching users without password hashes.
+ */
 export async function searchUsers(query: string): Promise<Omit<User, 'passwordHash'>[]> {
   return prisma.user.findMany({
     where: {
@@ -84,6 +128,11 @@
   });
 }
 
+/**
+ * List all users with optional pagination.
+ * @param options - Pagination options (skip, take).
+ * @returns A list of users without password hashes.
+ */
 export async function listUsers(options: { skip?: number; take?: number } = {}): Promise<Omit<User, 'passwordHash'>[]> {
   return prisma.user.findMany({
     skip: options.skip,
@@ -92,6 +141,12 @@
   });
 }
 
+/**
+ * Verify a user's email address.
+ * @param id - The user's UUID.
+ * @returns The updated user with verified email status.
+ */
 export async function verifyUserEmail(id: string): Promise<Omit<User, 'passwordHash'>> {
   return prisma.user.update({
     where: { id },
@@ -100,6 +155,12 @@
   });
 }
 
+/**
+ * Change a user's password.
+ * @param id - The user's UUID.
+ * @param newPassword - The new plain text password.
+ * @returns The updated user without the password hash.
+ */
 export async function changePassword(id: string, newPassword: string): Promise<Omit<User, 'passwordHash'>> {
   const passwordHash = await hashPassword(newPassword);
   
@@ -109,6 +170,12 @@
   });
 }
 
+/**
+ * Update a user's profile image.
+ * @param id - The user's UUID.
+ * @param imageUrl - The URL of the new profile image.
+ * @returns The updated user without the password hash.
+ */
 export async function updateProfileImage(id: string, imageUrl: string): Promise<Omit<User, 'passwordHash'>> {
   return prisma.user.update({
     where: { id },
@@ -117,6 +184,11 @@
   });
 }
 
+/**
+ * Get a user's public profile (limited fields).
+ * @param id - The user's UUID.
+ * @returns The user's public profile information.
+ */
 export async function getUserPublicProfile(id: string): Promise<Pick<User, 'id' | 'name' | 'email' | 'image' | 'createdAt'>> {
   const user = await prisma.user.findUnique({
     where: { id },
@@ -129,6 +201,12 @@
   return user;
 }
 
+/**
+ * Check if a user has admin privileges.
+ * @param id - The user's UUID.
+ * @returns True if the user is an admin, false otherwise.
+ */
 export async function isUserAdmin(id: string): Promise<boolean> {
   const user = await prisma.user.findUnique({
     where: { id },
@@ -138,6 +216,12 @@
   return user?.role === 'ADMIN';
 }
 
+/**
+ * Ban or unban a user account.
+ * @param id - The user's UUID.
+ * @param banned - Whether to ban (true) or unban (false) the user.
+ * @returns The updated user without the password hash.
+ */
 export async function setUserBanStatus(id: string, banned: boolean): Promise<Omit<User, 'passwordHash'>> {
   return prisma.user.update({
     where: { id },
@@ -146,6 +230,12 @@
   });
 }
 
+/**
+ * Count total users or filtered by a