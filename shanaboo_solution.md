 ```diff
--- a/apps/api/src/routes/user.routes.ts
+++ b/apps/api/src/routes/user.routes.ts
@@ -1,3 +1,4 @@
+// TODO: Implement GET /users - List all users with pagination, filtering by role/skills, and search
 import { Router } from 'express';
 import { authenticate, requireRole } from '../middleware/auth';
 import { validate } from '../middleware/validate';
@@ -8,6 +9,7 @@
 
 const router = Router();
 
+// TODO: GET /users/:id - Get user profile by ID. Return 404 if user not found. Include public tasks and reviews.
 router.get(
   '/:id',
   authenticate,
@@ -15,6 +17,7 @@
   userController.getById
 );
 
+// TODO: PUT /users/:id - Update user profile. Validate ownership (403) or admin access. Return 409 on email conflict.
 router.put(
   '/:id',
   authenticate,
@@ -23,6 +26,7 @@
   userController.update
 );
 
+// TODO: DELETE /users/:id - Soft delete user account. Require password confirmation. Cascade deactivate tasks. Return 410 on already deleted.
 router.delete(
   '/:id',
   authenticate,
@@ -30,6 +34,7 @@
   userController.remove
 );
 
+// TODO: GET /users/:id/tasks - Get public tasks for a user. Support pagination and status filter.
 router.get(
   '/:id/tasks',
   authenticate,
@@ -37,6 +42,7 @@
   userController.getUserTasks
 );
 
+// TODO: GET /users/:id/reviews - Get reviews for a user. Support pagination and sort by date/rating.
 router.get(
   '/:id/reviews',
   authenticate,
@@ -44,6 +50,7 @@
   userController.getUserReviews
 );
 
+// TODO: POST /users/:id/verify - Trigger email verification. Idempotent - return 200 if already verified, 429 if rate limited.
 router.post(
   '/:id/verify',
   authenticate,
@@ -52,6 +59,7 @@
   userController.requestVerification
 );
 
+// TODO: POST /users/:id/avatar - Upload avatar image. Validate file type (jpg/png) and size (<5MB). Return 413 if too large, 415 if wrong format.
 router.post(
   '/:id/avatar',
   authenticate,
@@ -60,6 +68,7 @@
   userController.uploadAvatar
 );
 
+// TODO: GET /users/search?q=&role=&skills=&page=&limit= - Search users with full-text search. Return empty array if no matches.
 router.get(
   '/search',
   authenticate,
@@ -67,6 +76,7 @@
   userController.search
 );
 
+// TODO: GET /users/me - Get current authenticated user. Return 401 if no valid session/token.
 router.get(
   '/me',
   authenticate,
@@ -74,6 +84,7 @@
   userController.getCurrentUser
 );
 
+// TODO: PUT /users/me/preferences - Update user preferences (notifications, theme, locale). Validate JSON schema.
 router.put(
   '/me/preferences',
   authenticate,
@@ -82,6 +93,7 @@
   userController.updatePreferences
 );
 
+// TODO: POST /users/:id/report - Report a user for violation. Rate limit to prevent abuse. Return 202 for async processing.
 router.post(
   '/:id/report',
   authenticate,
@@ -90,6 +102,7 @@
   userController.reportUser
 );
 
+// TODO: GET /users/:id/stats - Get user activity statistics (tasks completed, rating, earnings). Cache with 5min TTL.
 router.get(
   '/:id/stats',
   authenticate,
@@ -97,6 +110,7 @@
   userController.getUserStats
 );
 
+// TODO: POST /users/:id/follow - Follow/unfollow a user. Return 409 if already following. Prevent self-follow (400).
 router.post(
   '/:id/follow',
   authenticate,
@@ -104,6 +118,7 @@
   userController.toggleFollow
 );
 
+// TODO: GET /users/:id/followers - Get followers list. Support pagination. Return 403 if user has private profile and requester not following.
 router.get(
   '/:id/followers',
   authenticate,
@@ -111,6 +126,7 @@
   userController.getFollowers
 );
 
+// TODO: GET /users/:id/following - Get following list. Same privacy rules as followers.
 router.get(
   '/:id/following',
   authenticate,
@@ -118,6 +134,7 @@
   userController.getFollowing
 );
 
+// TODO: POST /users/:id/block - Block a user. Hide their content from each other. Idempotent - 200 if already blocked.
 router.post(
   '/:id/block',
   authenticate,
@@ -125,6 +142,7 @@
   userController.blockUser
 );
 
+// TODO: DELETE /users/:id/block - Unblock a user. Return 404 if not currently blocked.
 router.delete(
   '/:id/block',
   authenticate,
@@ -132,6 +150,7 @@
   userController.unblockUser
 );
 
+// TODO: GET /users/blocked - Get list of blocked users for current user.
 router.get(
   '/blocked',
   authenticate,
@@ -139,6 +158,7 @@
   userController.getBlockedUsers
 );
 
+// TODO: POST /users/:id/invite - Invite user to collaborate on a task. Validate task ownership. Return 410 if task closed.
 router.post(
   '/:id/invite',
   authenticate,
@@ -147,6 +167,7 @@
   userController.inviteToTask
 );
 
+// TODO: GET /users/leaderboard - Get top users by rating/tasks completed. Cache with 1 hour TTL. Support time range filter.
 router.get(
   '/leaderboard',
   authenticate,
@@ -154,6 +175,7 @@
   userController.getLeaderboard
 );
 
+// TODO: POST /users/:id/notify - Send notification to user. Require admin or system role. Validate message length (max 500 chars).
 router.post(
   '/:id/notify',
   authenticate,
@@ -162,6 +184,7 @@
   userController.sendNotification
 );
 
+// TODO: GET /users/:id/sessions - Get active sessions for user. Allow user to revoke sessions (DELETE /users/sessions/:sessionId).
 router.get(
   '/:id/sessions',
   authenticate,
@@ -169,6 +192,7 @@
   userController.getActiveSessions
 );
 
+// TODO: DELETE /users/sessions/:sessionId - Revoke a specific session. Validate session belongs to current user (or admin).
 router.delete(
   '/sessions/:sessionId',
   authenticate,
@@ -176,6 +200,7 @@
   userController.rev