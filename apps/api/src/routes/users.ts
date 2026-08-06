import { Router } from "express";
import { randomUUID } from "crypto";

const router = Router();

// Email validation regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validate and normalize a user creation payload.
 * Returns { errors, data } where data is the sanitized input.
 */
function validateUserPayload(body: unknown): { errors: string[]; data?: { email: string; name?: string } } {
    const errors: string[] = [];

    // Reject non-object bodies
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
        return { errors: ["Request body must be a JSON object."] };
    }

    const obj = body as Record<string, unknown>;

    // Require email
    const rawEmail = obj.email;
    if (rawEmail === undefined || rawEmail === null || typeof rawEmail !== "string" || rawEmail.trim() === "") {
        errors.push("Email is required.");
    } else {
        const normalizedEmail = rawEmail.trim().toLowerCase();
        if (!EMAIL_REGEX.test(normalizedEmail)) {
            errors.push("Email must be a valid email address.");
        }
        if (errors.length === 0) {
            // Normalize name if present
            const rawName = obj.name;
            let normalizedName: string | undefined;
            if (rawName !== undefined && rawName !== null) {
                if (typeof rawName !== "string") {
                    errors.push("Name must be a string if provided.");
                } else {
                    normalizedName = rawName.trim();
                    if (normalizedName === "") {
                        normalizedName = undefined;
                    }
                }
            }
            return { errors: [], data: { email: normalizedEmail, name: normalizedName } };
        }
    }

    return { errors };
}

router.get("/", (_req, res) => {
    res.json({
        data: [],
        message: "User listing is not implemented yet."
    });
});

router.post("/", (req, res) => {
    const { errors, data } = validateUserPayload(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            error: "VALIDATION_ERROR",
            message: errors.join(" "),
            details: errors,
        });
    }

    // Generate server-side ID, ignore any client-provided id or extra fields
    res.status(201).json({
        data: {
            id: randomUUID(),
            email: data!.email,
            ...(data!.name ? { name: data!.name } : {}),
        },
        message: "User created successfully."
    });
});

export default router;
