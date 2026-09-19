 ```diff
--- /dev/null
+++ b/apps/api/src/routes/user.routes.test.ts
@@ -0,0 +1,82 @@
+import request from 'supertest';
+import express from 'express';
+import userRoutes from './user.routes';
+
 mocked up for testing
+// Mock the controller methods
+const mockListUsers = jest.fn();
+const mockCreateUser = jest.fn();
+
+jest.mock('../controllers/user.controller', () => ({
+  listUsers: (...args: any[]) => mockListUsers(...args),
+  createUser: (...args: any[]) => mockCreateUser(...args),
+}));
+
+describe('User Routes', () => {
+  let app: express.Application;
+
+  beforeEach(() => {
+    app = express();
+    app.use(express.json());
+    app.use('/users', userRoutes);
+    jest.clearAllMocks();
+  });
+
+  describe('GET /users', () => {
+    it('should return a list of users', async () => {
+      const mockUsers = [
+        { id: '1', email: 'user1@example.com', name: 'User One' },
+        { id: '2', email: 'user2@example.com', name: 'User Two' },
+      ];
+      mockListUsers.mockImplementation((req, res) => {
+        res.status(200).json(mockUsers);
+      });
+
+      const response = await request(app).get('/users');
+
+     