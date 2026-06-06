/**
 * User Service — business logic for user management.
 *
 * Provides CRUD operations and validation over the User model.
 * Currently returns stubs; implement against the Prisma client
 * when the database connection is wired up.
 *
 * @module userService
 * @packageDocumentation
 */

import { PrismaClient } from "@prisma/client";

/** In-memory fallback when DATABASE_URL is not configured. */
let _prisma: PrismaClient | null = null;

/**
 * Returns a shared Prisma client instance (lazy singleton).
 * Falls back to null when no DATABASE_URL is set — callers
 * should handle the stub path gracefully.
 *
 * @returns PrismaClient instance or null
 */
function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (!_prisma) _prisma = new PrismaClient();
  return _prisma;
}

/** Shape returned by list / get operations. */
export interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Shape accepted by create / update operations. */
export interface UserInput {
  name: string;
  email: string;
}

/**
 * Validate a user input payload.
 *
 * @param body — Untrusted JSON body from the request
 * @returns `{ valid: true, data }` or `{ valid: false, error }`
 */
export function validateUserInput(
  body: unknown,
): { valid: true; data: UserInput } | { valid: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be a JSON object" };
  }
  const data = body as Record<string, unknown>;

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return { valid: false, error: "Field 'name' is required and must be a non-empty string" };
  }
  if (!data.email || typeof data.email !== "string" || data.email.trim().length === 0) {
    return { valid: false, error: "Field 'email' is required and must be a non-empty string" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return { valid: false, error: "Field 'email' must be a valid email address" };
  }
  return { valid: true, data: { name: data.name.trim(), email: data.email.trim() } };
}

/**
 * List all users.
 *
 * **Status:** stub — returns empty array until Prisma is wired.
 *
 * @returns Array of user records
 */
export async function listUsers(): Promise<UserRecord[]> {
  const db = getPrisma();
  if (db) return db.user.findMany({ orderBy: { createdAt: "desc" } });
  return []; // stub
}

/**
 * Get a single user by unique ID.
 *
 * @param id — CUID of the user record
 * @returns UserRecord or null if not found
 */
export async function getUserById(id: string): Promise<UserRecord | null> {
  const db = getPrisma();
  if (db) return db.user.findUnique({ where: { id } });
  return null; // stub
}

/**
 * Create a new user record.
 *
 * @param input — Validated name + email
 * @returns The created user record
 */
export async function createUser(input: UserInput): Promise<UserRecord> {
  const db = getPrisma();
  if (db) return db.user.create({ data: input });
  // Stub — return a deterministic fake record
  return {
    id: "stub-user-id",
    email: input.email,
    name: input.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Update an existing user by ID.
 *
 * **Status:** stub — returns 501 from the route layer.
 *
 * @param _id — User CUID
 * @param _input — Partial update payload
 */
export async function updateUser(
  _id: string,
  _input: Partial<UserInput>,
): Promise<UserRecord | null> {
  return null; // not implemented
}

/**
 * Delete a user by ID.
 *
 * **Status:** stub — returns 501 from the route layer.
 *
 * @param _id — User CUID
 */
export async function deleteUser(_id: string): Promise<boolean> {
  return false; // not implemented
}
