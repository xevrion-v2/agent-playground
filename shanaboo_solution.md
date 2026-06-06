 ```diff
--- a/apps/api/src/services/userService.ts
+++ b/apps/api/src/services/userService.ts
@@ -1,6 +1,13 @@
 import { PrismaClient, User } from '@prisma/client';
 import { prisma } from '../lib/prisma';
 
+/**
+ * Service for managing user-related database operations.
+ */
+
+/**
+ * Retrieve all users from the database.
+ */
 export async function getAllUsers(): Promise<User[]> {
   return prisma.user.findMany();
 }
@@ -9,6 +16,11 @@ export async function getUserById(id: string): Promise<User | null> {
   return prisma.user.findUnique({ where: { id } });
 }
 
+/**
+ * Find a user by their email address.
+ * @param email - The email to search for.
+ * @returns The matching user or null if not found.
+ */
 export async function getUserByEmail(email: string): Promise<User | null> {
   return prisma.user.findUnique({ where: { email } });
 }
@@ -17,6 +29,12 @@ export async function getUserByClerkId(clerkId: string): Promise<User | null> {
   return prisma.user.findUnique({ where: { clerkId } });
 }
 
+/**
+ * Create a new user record.
+ * @param data - The user data to create.
+ * @returns The newly created user.
+ * @throws Error if a user with the same email already exists.
+ */
 export async function createUser(data: {
   email: string;
   name?: string;
@@ -37,6 +55,13 @@ export async function createUser(data: {
   });
 }
 
+/**
+ * Update an existing user's information.
+ * @param id - The ID of the user to update.
+ * @param data - The fields to update.
+ * @returns The updated user.
+ * @throws Error if the user is not found.
+ */
 export async function updateUser(
   id: string,
   data: Partial<{
@@ -58,6 +83,11 @@ export async function updateUser(
   });
 }
 
+/**
+ * Delete a user by their ID.
+ * @param id - The ID of the user to delete.
+ * @throws Error if the user is not found.
+ */
 export async function deleteUser(id: string): Promise<void> {
   const existing = await prisma.user.findUnique({ where: { id } });
   if (!existing) {
@@ -66,6 +96,11 @@ export async function deleteUser(id: string): Promise<void> {
   await prisma.user.delete({ where: { id } });
 }
 
+/**
+ * Search for users by name (case-insensitive, partial match).
+ * @param query - The search string to match against user names.
+ * @returns A list of matching users.
+ */
 export async function searchUsersByName(query: string): Promise<User[]> {
   return prisma.user.findMany({
     where: {
@@ -77,6 +112,12 @@ export async function searchUsersByName(query: string): Promise<User[]> {
   });
 }
 
+/**
+ * Update a user's profile image.
+ * @param id - The ID of the user.
+ * @param imageUrl - The URL of the new profile image.
+ * @returns The updated user.
+ */
 export async function updateUserProfileImage(
   id: string,
   imageUrl: string
@@ -84,6 +125,11 @@ export async function updateUserProfileImage(
   return prisma.user.update({ where: { id }, data: { imageUrl } });
 }
 
+/**
+ * Verify a user's email address.
+ * @param id - The ID of the user to verify.
+ * @returns The updated user with emailVerified set to the current date.
+ */
 export async function verifyUserEmail(id: string): Promise<User> {
   return prisma.user.update({
     where: { id },
@@ -91,6 +137,11 @@ export async function verifyUserEmail(id: string): Promise<User> {
   });
 }
 
+/**
+ * Toggle a user's active status.
+ * @param id - The ID of the user.
+ * @returns The updated user with flipped isActive value.
+ */
 export async function toggleUserActiveStatus(id: string): Promise<User> {
   const user = await prisma.user.findUnique({ where: { id } });
   if (!user) {
@@ -102,6 +153,12 @@ export async function toggleUserActiveStatus(id: string): Promise<User> {
   });
 }
 
+/**
+ * Update a user's role.
+ * @param id - The ID of the user.
+ * @param role - The new role to assign.
+ * @returns The updated user.
+ */
 export async function updateUserRole(
   id: string,
   role: 'ADMIN' | 'CLIENT' | 'FREELANCER'
@@ -109,6 +166,11 @@ export async function updateUserRole(
   return prisma.user.update({ where: { id }, data: { role } });
 }
 
+/**
+ * Retrieve all tasks associated with a user.
+ * @param userId - The ID of the user.
+ * @returns A list of tasks owned by the user.
+ */
 export async function getUserTasks(userId: string) {
   return prisma.task.findMany({
     where: { ownerId: userId },
@@ -116,6 +178,11 @@ export async function getUserTasks(userId: string) {
   });
 }
 
+/**
+ * Retrieve all proposals submitted by a user.
+ * @param userId - The ID of the user.
+ * @returns A list of proposals with related task information.
+ */
 export async function getUserProposals(userId: string) {
   return prisma.proposal.findMany({
     where: { freelancerId: userId },
@@ -123,6 +190,11 @@ export async function getUserProposals(userId: string) {
   });
 }
 
+/**
+ * Retrieve all reviews received by a user.
+ * @param userId - The ID of the user.
+ * @returns A list of reviews with reviewer information.
+ */
 export async function getUserReviews(userId: string) {
   return prisma.review.findMany({
     where: { revieweeId: userId },
@@ -130,6 +202,11 @@ export async function getUserReviews(userId: string) {
   });
 }
 
+/**
+ * Retrieve all reviews written by a user.
+ * @param userId - The ID of the user.
+ * @returns A list of reviews with reviewee information.
+ */
 export async function getUserWrittenReviews(userId: string) {
   return prisma.review.findMany({
     where: { reviewerId: userId },
@@ -137,6 +214,11 @@ export async function getUserWrittenReviews(userId: string) {
   });
 }
 
+/**
+ * Retrieve all messages sent or received by a user.
+ * @param userId - The ID of the user.
+ * @returns A list of messages with sender and receiver details.
+ */
 export async