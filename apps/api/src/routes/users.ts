import { Router } from "express";

const router = Router();

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

interface ApiError {
  error: {
    code: string;
    message: string;
    details?: string[];
  };
}

// ---------------------------------------------------------------------------
// Validation Helpers
// ---------------------------------------------------------------------------

function isValidEmail(email: unknown): email is string {
  if (typeof email !== "string") return false;
  // RFC 5322 compliant regex (simplified for production)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeName(name: unknown): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function generateUserId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `usr_${timestamp}_${random}`;
}

function sanitizeUserInput(body: Record<string, unknown>): {
  email: string;
  name: string | null;
} {
  const rawEmail = body["email"];
  const rawName = body["name"];

  if (!isValidEmail(rawEmail)) {
    throw new ValidationError("Invalid or missing email address");
  }

  return {
    email: normalizeEmail(rawEmail),
    name: normalizeName(rawName),
  };
}

// ---------------------------------------------------------------------------
// Custom Error Class
// ---------------------------------------------------------------------------

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// ---------------------------------------------------------------------------
// In-Memory Store (replace with database in production)
// ---------------------------------------------------------------------------

const users: Map<string, UserResponse> = new Map();

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

router.get("/", (_req, res) => {
  const userList = Array.from(users.values());
  res.json({
    data: userList,
    message: `Found ${userList.length} user(s)`,
  } as ApiResponse<UserResponse[]>);
});

router.post("/", (req, res) => {
  try {
    // 1. Reject non-object JSON bodies
    if (req.body === null || typeof req.body !== "object" || Array.isArray(req.body)) {
      const response: ApiError = {
        error: {
          code: "INVALID_BODY",
          message: "Request body must be a JSON object",
        },
      };
      res.status(400).json(response);
      return;
    }

    // 2. Validate and sanitize input (ignores client-provided id and extra fields)
    const { email, name } = sanitizeUserInput(req.body as Record<string, unknown>);

    // 3. Check for duplicate email
    const existingUser = Array.from(users.values()).find((u) => u.email === email);
    if (existingUser) {
      const response: ApiError = {
        error: {
          code: "DUPLICATE_EMAIL",
          message: "An account with this email already exists",
        },
      };
      res.status(409).json(response);
      return;
    }

    // 4. Generate id server-side (ignore any client-provided id)
    const user: UserResponse = {
      id: generateUserId(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    // 5. Store and respond
    users.set(user.id, user);

    const response: ApiResponse<UserResponse> = {
      data: user,
      message: "User created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof ValidationError) {
      const response: ApiError = {
        error: {
          code: "VALIDATION_ERROR",
          message: error.message,
        },
      };
      res.status(400).json(response);
      return;
    }

    // Unexpected error
    const response: ApiError = {
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
    };
    res.status(500).json(response);
  }
});

router.get("/:id", (req, res) => {
  const user = users.get(req.params.id);
  if (!user) {
    const response: ApiError = {
      error: {
        code: "NOT_FOUND",
        message: `User with id '${req.params.id}' not found`,
      },
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<UserResponse> = {
    data: user,
    message: "User found",
  };
  res.json(response);
});

export default router;
