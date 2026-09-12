import { randomUUID } from "node:crypto";

export interface UserRecord {
  id: string;
  email: string;
  name?: string;
}

export class UserValidationError extends Error {
  constructor(
    message: string,
    public readonly details: string[]
  ) {
    super(message);
    this.name = "UserValidationError";
  }
}

type IdGenerator = () => string;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function listUsers(): UserRecord[] {
  return [];
}

export function createUser(
  input: unknown,
  generateId: IdGenerator = randomUUID
): UserRecord {
  if (!isPlainObject(input)) {
    throw new UserValidationError("Invalid user payload.", [
      "Request body must be a JSON object."
    ]);
  }

  const errors: string[] = [];
  const email = normalizeEmail(input.email, errors);
  const name = normalizeName(input.name, errors);

  if (errors.length > 0 || email === undefined) {
    throw new UserValidationError("Invalid user payload.", errors);
  }

  return {
    id: generateId(),
    email,
    ...(name === undefined ? {} : { name })
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeEmail(value: unknown, errors: string[]): string | undefined {
  if (typeof value !== "string") {
    errors.push("email is required and must be a string.");
    return undefined;
  }

  const email = value.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    errors.push("email must be a valid email address.");
    return undefined;
  }

  return email;
}

function normalizeName(value: unknown, errors: string[]): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    errors.push("name must be a string when provided.");
    return undefined;
  }

  const name = value.trim().replace(/\s+/g, " ");
  return name.length === 0 ? undefined : name;
}
