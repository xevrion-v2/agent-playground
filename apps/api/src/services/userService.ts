/**
 * User service module for the TaskFlow API.
 *
 * Provides a thin, framework-agnostic layer for user-related business
 * logic. Routes (e.g. `apps/api/src/routes/users.ts`) should delegate
 * HTTP concerns to this module rather than reaching into the database
 * directly. Keeping the boundary clean lets us swap the persistence
 * backend (Prisma client, REST client, in-memory mock, ...) without
 * touching the route handlers.
 *
 * The current implementation is intentionally a stub — it returns
 * deterministic placeholder data so that callers can wire up their
 * routes and tests today. Real persistence will be added once the
 * Prisma client is wired in `packages/db`.
 *
 * @module userService
 */

/**
 * Public representation of a user as returned by the service layer.
 *
 * `id` is a stable string identifier. Field names mirror the columns
 * defined on the `User` model in `packages/db/prisma/schema.prisma`
 * so that callers can serialise the object straight to JSON.
 */
export interface User {
  /** Stable identifier (matches `User.id` in the Prisma schema). */
  id: string;
  /** Full legal name as captured during onboarding. */
  fullName: string;
  /** Primary email address; also used as the login handle. */
  email: string;
  /** Optional short bio shown on the freelancer profile page. */
  bio?: string | null;
  /** Account role. Allowed values: `"client"`, `"freelancer"`, `"admin"`. */
  role: "client" | "freelancer" | "admin";
  /** ISO-8601 timestamp of account creation. */
  createdAt: string;
}

/**
 * Payload accepted by {@link UserService.create}. Everything except
 * `fullName` and `email` is optional so that callers can register a
 * user with just the minimum required fields.
 */
export interface CreateUserInput {
  /** Full legal name; required. */
  fullName: string;
  /** Primary email address; required. */
  email: string;
  /** Optional short bio. */
  bio?: string | null;
  /** Account role. Defaults to `"freelancer"` when omitted. */
  role?: User["role"];
}

/**
 * Subset of {@link User} fields that may be updated via
 * {@link UserService.update}. Sensitive fields such as `id` and
 * `createdAt` are intentionally not editable.
 */
export type UpdateUserInput = Partial<Pick<User, "fullName" | "email" | "bio" | "role">>;

/**
 * User service contract.
 *
 * The interface is exported separately so that tests can supply
 * in-memory fakes and so that future implementations (Prisma,
 * remote API, etc.) can be swapped without changing call sites.
 */
export interface UserService {
  /**
   * List all users, optionally filtered by role.
   *
   * @param options - Optional filter options.
   * @param options.role - When provided, only users with this role are returned.
   * @returns A promise resolving to an array of {@link User} records.
   *   The array is empty when no users match the filter.
   */
  list(options?: { role?: User["role"] }): Promise<User[]>;

  /**
   * Look up a single user by id.
   *
   * @param id - The user identifier.
   * @returns A promise resolving to the {@link User}, or `null` if no
   *   user with that id exists.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Create a new user.
   *
   * @param input - The user fields to create. See {@link CreateUserInput}.
   * @returns A promise resolving to the newly created {@link User},
   *   including the server-generated `id` and `createdAt`.
   * @throws If `fullName` or `email` is missing, or if a user with
   *   the same `email` already exists.
   */
  create(input: CreateUserInput): Promise<User>;

  /**
   * Update an existing user.
   *
   * @param id - The id of the user to update.
   * @param patch - Partial update payload. See {@link UpdateUserInput}.
   * @returns A promise resolving to the updated {@link User}.
   * @throws If no user with `id` exists, or if the patch would
   *   produce an invalid record (for example an empty `fullName`).
   */
  update(id: string, patch: UpdateUserInput): Promise<User>;

  /**
   * Delete a user by id.
   *
   * @param id - The id of the user to delete.
   * @returns A promise resolving to `true` when the user was
   *   removed, or `false` when no user with that id existed.
   */
  delete(id: string): Promise<boolean>;
}

/**
 * In-memory implementation of {@link UserService}.
 *
 * Data lives in a process-local `Map` for the lifetime of the
 * server. This keeps the API surface stable while persistence is
 * still being wired up; once Prisma is integrated, swap the body of
 * each method for a real query without changing callers.
 */
class InMemoryUserService implements UserService {
  private readonly users = new Map<string, User>();
  private readonly emailIndex = new Map<string, string>();
  private nextId = 1;

  async list(options?: { role?: User["role"] }): Promise<User[]> {
    const all = Array.from(this.users.values());
    if (!options?.role) {
      return all;
    }
    return all.filter((user) => user.role === options.role);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async create(input: CreateUserInput): Promise<User> {
    if (!input.fullName || !input.email) {
      throw new Error("fullName and email are required");
    }
    if (this.emailIndex.has(input.email)) {
      throw new Error(`User with email ${input.email} already exists`);
    }
    const id = `user_${this.nextId++}`;
    const user: User = {
      id,
      fullName: input.fullName,
      email: input.email,
      bio: input.bio ?? null,
      role: input.role ?? "freelancer",
      createdAt: new Date().toISOString(),
    };
    this.users.set(id, user);
    this.emailIndex.set(user.email, id);
    return user;
  }

  async update(id: string, patch: UpdateUserInput): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) {
      throw new Error(`User ${id} not found`);
    }
    if (patch.fullName !== undefined && !patch.fullName) {
      throw new Error("fullName cannot be empty");
    }
    if (patch.email !== undefined && patch.email !== existing.email) {
      if (this.emailIndex.has(patch.email)) {
        throw new Error(`User with email ${patch.email} already exists`);
      }
      this.emailIndex.delete(existing.email);
      this.emailIndex.set(patch.email, id);
    }
    const updated: User = {
      ...existing,
      ...patch,
      id: existing.id,
      createdAt: existing.createdAt,
    };
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const existing = this.users.get(id);
    if (!existing) {
      return false;
    }
    this.users.delete(id);
    this.emailIndex.delete(existing.email);
    return true;
  }
}

/**
 * Default {@link UserService} instance used by the API layer.
 *
 * Importing this singleton keeps call sites short:
 *
 * ```ts
 * import { userService } from "../services/userService.js";
 * const users = await userService.list();
 * ```
 *
 * Tests should construct their own {@link InMemoryUserService} (or a
 * custom implementation of {@link UserService}) instead of touching
 * this shared state.
 */
export const userService: UserService = new InMemoryUserService();