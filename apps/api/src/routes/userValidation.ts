type ValidCreateUserPayload = {
  name: string;
  email: string;
};

type ValidationResult =
  | {
      ok: true;
      data: ValidCreateUserPayload;
    }
  | {
      ok: false;
      errors: string[];
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateCreateUserPayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) {
    return {
      ok: false,
      errors: ["request body must be an object"]
    };
  }

  const errors: string[] = [];
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!name) {
    errors.push("name is required");
  }

  if (!email) {
    errors.push("email is required");
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push("email must be valid");
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }

  return {
    ok: true,
    data: {
      name,
      email
    }
  };
}
