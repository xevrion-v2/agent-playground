// TODO: POST /auth/register - create new user account; return 201 on success, 409 if email exists, 400 for weak password, 500 on DB failure
import { Router } from 'express';
import { register, login, refreshToken, oauthCallback } from '../controllers/auth.controller';

// TODO: POST /auth/refresh - refresh JWT access token
router.post('/refresh', refreshToken);

// TODO: POST /auth/forgot-password - initiate password reset flow; return 404 if email not found, 429 if rate limited, 500 on email service failure
// TODO: POST /auth/reset-password - confirm password reset with token; return 400 for invalid/expired token, 500 on DB failure

export default router;