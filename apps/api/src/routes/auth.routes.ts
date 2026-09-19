// TODO: Add TODO comments for remaining auth route stubs
// TODO: Implement password reset flow with email verification
import { Router } from 'express';
import { register, login, refreshToken, oauthCallback } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';

const router = Router();

// TODO: Return 409 Conflict when email is already registered
// TODO: Send welcome email after successful registration
router.post('/register', validate(registerSchema), register);

// TODO: Return 401 Unauthorized for invalid credentials with generic error message (security)
// TODO: Implement account lockout after 5 failed attempts
router.post('/login', validate(loginSchema), login);

// TODO: Return 401 for expired or invalid refresh tokens
// TODO: Implement refresh token rotation for security
router.post('/refresh', refreshToken);

// TODO: Implement OAuth state parameter validation to prevent CSRF
// TODO: Handle OAuth provider errors gracefully (return 502 Bad Gateway)
router.get('/oauth/callback', oauthCallback);

export default router;