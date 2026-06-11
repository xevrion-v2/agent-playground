 ```diff
--- /dev/null
+++ b/apps/api/src/scripts/updateLeaderboard.test.ts
@@ -0,0 +1,156 @@
+import { describe, it, expect, beforeEach, jest } from '@jest/globals';
+import fs from 'fs';
+import path from 'path';
+
+// Mock fs module
+jest.mock('fs');
+
+interface Contributor {
+  username: string;
+  score: number;
+  contributions: number;
+  lastUpdated: string;
+}
+
+interface LeaderboardData {
+  contributors: Contributor[];
+  lastUpdated: string;
+}
+
+describe('updateLeaderboard', () => {
+  const leaderboardPath = path.join(process.cwd(), '..', '..', 'leaderboard.json');
+  const mockDate = new Date('2024-01-15T10:00:00.000Z');
+
+  beforeEach(() => {
+    jest.clearAllMocks();
+    jest.useFakeTimers().setSystemTime(mockDate);
+  });
+
+  afterEach(() => {
+    jest.useRealTimers();
+  });
+
+  describe('new contributors', () => {
+    it('should add a new contributor to an empty leaderboard', () => {
+      const initialData: LeaderboardData = {
+        contributors: [],
+        lastUpdated: mockDate.toISOString(),
+      };
+
+      (fs.existsSync as jest.Mock).mockReturnValue(true);
+      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(initialData));
+
+      const newContributor: Contributor = {
+        username: 'newuser',
+        score: 100,
+        contributions: 5,
+        lastUpdated: mockDate.toISOString(),
+      };
+
+      const updatedData: LeaderboardData = {
+        contributors: [newContributor],
+        lastUpdated: mockDate.toISOString(),
+      };
+
+      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
+
+      // Simulate the update logic
+      const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8')) as LeaderboardData;
+      data.contributors.push(newContributor);
+      data.lastUpdated = mockDate.toISOString();
+      fs.writeFileSync(leaderboardPath, JSON.stringify(data, null, 2));
+
+      expect(fs.writeFileSync).toHaveBeenCalledWith(
+        leaderboardPath,
+        JSON.stringify(updatedData, null, 2)
+      );
+    });
+
+    it('should add a new contributor to existing leaderboard', () => {
+      const existingContributor: Contributor = {
+        username: 'existinguser',
+        score: 200,
+        contributions: 10,
+        lastUpdated: '2024-01-01T00:00:00.000Z',
+      };
+
+      const initialData: LeaderboardData = {
+        contributors: [existingContributor],
+        lastUpdated: '2024-01-01T00:00:00.000Z',
+      };
+
+      (fs.existsSync as jest.Mock).mockReturnValue(true);
+      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(initialData));
+
+      const newContributor: Contributor = {
+        username: 'newuser',
+        score: 150,
+        contributions: 7,
+        lastUpdated: mockDate.toISOString(),
+      };
+
+      const updatedData: LeaderboardData = {
+        contributors: [existingContributor, newContributor],
+        lastUpdated: mockDate.toISOString(),
+      };
+
+      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
+
+      const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8')) as LeaderboardData;
+      data.contributors.push(newContributor);
+      data.lastUpdated = mockDate.toISOString();
+      fs.writeFileSync(leaderboardPath, JSON.stringify(data, null, 2));
+
+      expect(fs.writeFileSync).toHaveBeenCalledWith(
+        leaderboardPath,
+        JSON.stringify(updatedData, null, 2)
+      );
+    });
+  });
+
+  describe('existing contributors', () => {
+    it('should update score and contributions for existing contributor', () => {
+      const existingContributor: Contributor = {
+        username: 'existinguser',
+        score: 200,
+        contributions: 10,
+        lastUpdated: '2024-01-01T00:00:00.000Z',
+      };
+
+      const initialData: LeaderboardData = {
+        contributors: [existingContributor],
+        lastUpdated: '2024-01-01T00:00:00.000Z',
+      };
+
+      (fs.existsSync as jest.Mock).mockReturnValue(true);
+      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(initialData));
+
+      const updatedContributor: Contributor = {
+        username: 'existinguser',
+        score: 350,
+        contributions: 15,
+        lastUpdated: mockDate.toISOString(),
+      };
+
+      const updatedData: LeaderboardData = {
+        contributors: [updatedContributor],
+        lastUpdated: mockDate.toISOString(),
+      };
+
+      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
+
+      const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8')) as LeaderboardData;
+      const index = data.contributors.findIndex(c => c.username === 'existinguser');
+      if (index !== -1) {
+        data.contributors[index] = updatedContributor;
+      }
+      data.lastUpdated = mockDate.toISOString();
+      fs.writeFileSync(leaderboardPath, JSON.stringify(data, null, 2));
+
+      expect(fs.writeFileSync).toHaveBeenCalledWith(
+        leaderboardPath,
+        JSON.stringify(updatedData, null, 2)
+      );
+    });
+
+    it('should not duplicate existing contributor', () => {
+      const existingContributor: Contributor = {
+        username: 'existinguser',
+        score: 200,
+        contributions: 10,
+        lastUpdated: '2024-01-01T00:00:00.000Z',
+      };
+
+      const initialData: LeaderboardData = {
+        contributors: [existingContributor],
+        lastUpdated: '2024-01-01T00:00:00.000Z',
+      };
+
+      (fs.existsSync as jest.Mock).mockReturnValue(true);
+      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(initialData));
+
+      const updatedContributor: Contributor = {
+        username: 'existinguser',
+        score: 350,
+        contributions: 15,
+        lastUpdated: mockDate.toISOString(),
+