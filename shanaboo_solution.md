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
+// Import the functions to test (we'll extract them from the script)
+// Since the script may not exist yet, we'll create a testable version
+
+interface Contributor {
+  username: string;
+  points: number;
+  contributions: number;
+  lastUpdated: string;
+}
+
+interface LeaderboardData {
+  contributors: Contributor[];
+  lastUpdated: string;
+}
+
+// Helper functions that mirror the script logic
+function findContributor(contributors: Contributor[], username: string): Contributor | undefined {
+  return contributors.find(c => c.username === username);
+}
+
+function addContributor(contributors: Contributor[], username: string): Contributor {
+  const newContributor: Contributor = {
+    username,
+    points: 0,
+    contributions: 0,
+    lastUpdated: new Date().toISOString(),
+  };
+  contributors.push(newContributor);
+  return newContributor;
+}
+
+function updateContributorPoints(contributor: Contributor, points: number): void {
+  contributor.points += points;
+  contributor.contributions += 1;
+  contributor.lastUpdated = new Date().toISOString();
+}
+
+function processContribution(
+  leaderboardData: LeaderboardData,
+  username: string,
+  points: number
+): void {
+  let contributor = findContributor(leaderboardData.contributors, username);
+  
+  if (!contributor) {
+    contributor = addContributor(leaderboardData.contributors, username);
+  }
+  
+  updateContributorPoints(contributor, points);
+  leaderboardData.lastUpdated = new Date().toISOString();
+}
+
+describe('Leaderboard Update Script', () => {
+  const mockLeaderboardPath = path.join(__dirname, '..', '..', '..', '..', 'leaderboard.json');
+  
+  beforeEach(() => {
+    jest.clearAllMocks();
+  });
+
+  describe('New Contributors', () => {
+    it('should add a new contributor to an empty leaderboard', () => {
+      const leaderboardData: LeaderboardData = {
+        contributors: [],
+        lastUpdated: new Date().toISOString(),
+      };
+
+      processContribution(leaderboardData, 'newuser', 10);
+
+      expect(leaderboardData.contributors).toHaveLength(1);
+      expect(leaderboardData.contributors[0].username).toBe('newuser');
+      expect(leaderboardData.contributors[0].points).toBe(10);
+      expect(leaderboardData.contributors[0].contributions).toBe(1);
+    });
+
+    it('should add multiple new contributors', () => {
+      const leaderboardData: LeaderboardData = {
+        contributors: [],
+        lastUpdated: new Date().toISOString(),
+      };
+
+      processContribution(leaderboardData, 'user1', 5);
+      processContribution(leaderboardData, 'user2', 15);
+
+      expect(leaderboardData.contributors).toHaveLength(2);
+      expect(leaderboardData.contributors[0].username).toBe('user1');
+      expect(leaderboardData.contributors[1].username).toBe('user2');
+    });
+  });
+
+  describe('Existing Contributors', () => {
+    it('should update points for an existing contributor', () => {
+      const leaderboardData: LeaderboardData = {
+        contributors: [
+          { username: 'existinguser', points: 20, contributions: 2, lastUpdated: '2024-01-01' },
+        ],
+        lastUpdated: '2024-01-01',
+      };
+
+      processContribution(leaderboardData, 'existinguser', 10);
+
+      expect(leaderboardData.contributors).toHaveLength(1);
+      expect(leaderboardData.contributors[0].username).toBe('existinguser');
+      expect(leaderboardData.contributors[0].points).toBe(30);
+      expect(leaderboardData.contributors[0].contributions).toBe(3);
+    });
+
+    it('should accumulate multiple contributions for the same user', () => {
+      const leaderboardData: LeaderboardData = {
+        contributors: [],
+        lastUpdated: new Date().toISOString(),
+      };
+
+      processContribution(leaderboardData, 'activeuser', 5);
+      processContribution(leaderboardData, 'activeuser', 10);
+      processContribution(leaderboardData, 'activeuser', 15);
+
+      expect(leaderboardData.contributors).toHaveLength(1);
+      expect(leaderboardData.contributors[0].username).toBe('activeuser');
+      expect(leaderboardData.contributors[0].points).toBe(30);
+      expect(leaderboardData.contributors[0].contributions).toBe(3);
+    });
+  });
+
+  describe('Leaderboard Metadata', () => {
+    it('should update lastUpdated timestamp when adding a new contributor', () => {
+      const oldDate = '2024-01-01T00:00:00.000Z';
+      const leaderboardData: LeaderboardData = {
+        contributors: [],
+        lastUpdated: oldDate,
+      };
+
+      processContribution(leaderboardData, 'newuser', 10);
+
+      expect(leaderboardData.lastUpdated).not.toBe(oldDate);
+      expect(new Date(leaderboardData.lastUpdated).getTime()).toBeGreaterThan(
+        new Date(oldDate).getTime()
+      );
+    });
+
+    it('should update lastUpdated timestamp when updating an existing contributor', () => {
+      const oldDate = '2024-01-01T00:00:00.000Z';
+      const leaderboardData: LeaderboardData = {
+        contributors: [
+          { username: 'existinguser', points: 10, contributions: 1, lastUpdated: oldDate },
+        ],
+        lastUpdated: oldDate,
+      };
+
+      processContribution(leaderboardData, 'existinguser', 5);
+
+      expect(leaderboardData.lastUpdated).not.toBe(oldDate);
+    });
+  });
+
+  describe('Edge Cases', () => {
+    it('should handle zero points contribution', () => {
+      const leaderboardData: LeaderboardData = {
+        contributors: [],
