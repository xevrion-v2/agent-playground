 ```diff
--- a/apps/api/src/services/userService.ts
+++ b/apps/api/src/services/userService.ts
@@ -1,3 +1,8 @@
+/**
+ * User service module
+ * Handles business logic for user-related operations
+ */
+
 import { PrismaClient, User } from '@prisma/client';
 import { hashPassword, comparePassword } from '../utils/password';
 import { generateToken } from '../utils/jwt';
@@ -5,6 +10,12 @@
 
 const prisma = new PrismaClient();
 
+/**
+ * Find a user by their email address
+ * @param {string} email - The email address to search for
+ * @returns {Promise<User | null>} The user if found, null otherwise
+ */
 export async function findUserByEmail(email: string): Promise<User | null> {
   return prisma.user.findUnique({
     where: { email },
@@ -12,6 +23,12 @@
   });
 }
 
+/**
+ * Find a user by their unique ID
+ * @param {string} id - The user ID to search for
+ * @returns {Promise<User | null>} The user if found, null otherwise
+ */
 export async function findUserById(id: string): Promise<User | null> {
   return prisma.user.findUnique({
     where: { id },
@@ -19,6 +36,13 @@
   });
 }
 
+/**
+ * Create a new user with hashed password
+ * @param {string} email - The user's email address
+ * @param {string} password - The plain text password to hash and store
+ * @param {string} name - The user's display name
+ * @returns {Promise<User>} The newly created user
+ */
 export async function createUser(email: string, password: string, name: string): Promise<User> {
   const hashedPassword = await hashPassword(password);
   
@@ -33,6 +57,13 @@
   });
 }
 
+/**
+ * Authenticate a user with email and password
+ * @param {string} email - The user's email address
+ * @param {string} password - The plain text password to verify
+ * @returns {Promise<{ user: User; token: string }>} The authenticated user and JWT token
+ * @throws {Error} If credentials are invalid
+ */
 export async function authenticateUser(email: string, password: string): Promise<{ user: User; token: string }> {
   const user = await prisma.user.findUnique({
     where: { email },
@@ -51,6 +82,12 @@
   return { user, token };
 }
 
+/**
+ * Update a user's profile information
+ * @param {string} id - The user ID to update
+ * @param {Partial<User>} data - The fields to update
+ * @returns {Promise<User>} The updated user
+ */
 export async function updateUser(id: string, data: Partial<User>): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -58,6 +95,11 @@
   });
 }
 
+/**
+ * Delete a user account permanently
+ * @param {string} id - The user ID to delete
+ * @returns {Promise<User>} The deleted user
+ */
 export async function deleteUser(id: string): Promise<User> {
   return prisma.user.delete({
     where: { id },
@@ -65,6 +107,11 @@
 }
 
+/**
+ * Search for users by name (case-insensitive partial match)
+ * @param {string} query - The search string to match against user names
+ * @returns {Promise<User[]>} Array of matching users
+ */
 export async function searchUsers(query: string): Promise<User[]> {
   return prisma.user.findMany({
     where: {
@@ -77,6 +124,11 @@
   });
 }
 
+/**
+ * Get all users in the system (admin use)
+ * @returns {Promise<User[]>} Array of all users
+ */
 export async function getAllUsers(): Promise<User[]> {
   return prisma.user.findMany({
     select: {
@@ -90,6 +142,12 @@
   });
 }
 
+/**
+ * Update a user's role (admin only)
+ * @param {string} id - The user ID to update
+ * @param {UserRole} role - The new role to assign
+ * @returns {Promise<User>} The updated user
+ */
 export async function updateUserRole(id: string, role: UserRole): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -99,6 +157,12 @@
   });
 }
 
+/**
+ * Verify a user's email address
+ * @param {string} id - The user ID to verify
+ * @returns {Promise<User>} The updated user with verified email
+ */
 export async function verifyUserEmail(id: string): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -108,6 +172,12 @@
   });
 }
 
+/**
+ * Change a user's password after verifying current password
+ * @param {string} id - The user ID
+ * @param {string} currentPassword - The current plain text password
+ * @param {string} newPassword - The new plain text password to hash and store
+ * @returns {Promise<User>} The updated user
+ */
 export async function changePassword(id: string, currentPassword: string, newPassword: string): Promise<User> {
   const user = await prisma.user.findUnique({
     where: { id },
@@ -127,6 +197,12 @@
   });
 }
 
+/**
+ * Get a user's public profile (excludes sensitive fields)
+ * @param {string} id - The user ID
+ * @returns {Promise<Partial<User> | null>} Public profile data or null if not found
+ */
 export async function getUserProfile(id: string): Promise<Partial<User> | null> {
   const user = await prisma.user.findUnique({
     where: { id },
@@ -148,6 +224,12 @@
   return user;
 }
 
+/**
+ * Get a user's tasks (both created and assigned)
+ * @param {string} id - The user ID
+ * @returns {Promise<{ created: Task[]; assigned: Task[] }>} Object containing created and assigned tasks
+ */
 export async function getUserTasks(id: string): Promise<{ created: Task[]; assigned: Task[] }> {
   const created = await prisma.task.findMany({
     where: { creatorId: id },
@@ -162,6 +244,12 @@
   return { created, assigned };
 }
 
+/**
+ * Get a user's proposals with related task information
+ * @param {string} id - The user ID
+ * @returns {Promise<Proposal[]>} Array of proposals with task details
+ */
 export async function getUserProposals(id: string): Promise<Proposal[]> {
   return prisma.proposal.findMany({
    