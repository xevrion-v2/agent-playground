// TODO: Centralize route registration and add global error handling middleware
// TODO: Add API versioning strategy (e.g., /v1/users, /v2/users)
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/users', usersRoutes); // Admin user management
// TODO: Consider consolidating /users and /users admin routes under single router with middleware guards
// TODO: Add rate limiting to all routes (e.g., 100 req/15min for auth, stricter for login attempts)
// TODO: Add request logging middleware for debugging and analytics
// TODO: Add OpenAPI/Swagger documentation route at /api/docs

router.use('/tasks', taskRoutes);
router.use('/proposals', proposalRoutes);
router.use('/notifications', notificationRoutes);
router.use('/uploads', uploadRoutes);
router.use('/admin', adminRoutes);
// TODO: Add health check endpoint /health for monitoring and load balancers
// TODO: Add 404 handler for unmatched routes with consistent error response format
// TODO: Add global error handler to catch unhandled exceptions and return 500 with trace ID (no stack in prod)

export default router;