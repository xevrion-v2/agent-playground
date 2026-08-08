/**
 * Service layer for user-related business logic.
 *
 * Provides a documented interface for user CRUD operations.
 * Currently backed by an in-memory store; designed to be replaced
 * with a database adapter in a future iteration.
 *
 * @module userService
 */

import type { Request, Response } from "express";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Represents a user entity within the system.
 */
export interface User {
  /** Unique identifier for the user. */
  id: string;
  /** Optional display name. */
  name?: string;
  /** Optional email address. */
  email?: string;
  /** ISO-8601 timestamp of when the user record was created. */
  createdAt?: string;
}

// ---------------------------------------------------------------------------
// In-memory store (placeholder until a database is introduced)
// ---------------------------------------------------------------------------

/** In-memory collection of user records. */
const users: User[] = [];

// ---------------------------------------------------------------------------
// Service functions
// ---------------------------------------------------------------------------

/**
 * Retrieves all users currently stored in memory.
 *
 * @returns A promise that resolves to the full list of user objects.
 */
export async function listUsers(): Promise<User[]> {
  return users;
}

/**
 * Creates a new user from the supplied partial data.
 *
 * A unique ID is automatically generated when one is not provided.
 *
 * @param userData - Partial user data to seed the new record with.
 * @returns A promise that resolves to the newly created user, including the
 *          generated `id` and `createdAt` fields.
 */
export async function createUser(userData: Partial<User>): Promise<User> {
  const user: User = {
    id: userData.id ?? `user-${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

/**
 * Finds a single user by their unique identifier.
 *
 * @param id - The unique ID of the user to look up.
 * @returns A promise that resolves to the user if found, otherwise `undefined`.
 */
export async function getUserById(id: string): Promise<User | undefined> {
  return users.find((u) => u.id === id);
}

/**
 * Applies a partial update to an existing user record.
 *
 * @param id      - The unique ID of the user to update.
 * @param updates - An object containing the fields to merge into the existing
 *                  record.
 * @returns A promise that resolves to the updated user, or `undefined` when no
 *          user matches the supplied `id`.
 */
export async function updateUser(
  id: string,
  updates: Partial<User>,
): Promise<User | undefined> {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return undefined;
  users[idx] = { ...users[idx], ...updates };
  return users[idx];
}

/**
 * Removes a user from the in-memory store by their unique identifier.
 *
 * @param id - The unique ID of the user to delete.
 * @returns A promise that resolves to `true` when a user was deleted, or
 *          `false` when no user matched the supplied `id`.
 */
export async function deleteUser(id: string): Promise<boolean> {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}
