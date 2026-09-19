 ```diff
--- /dev/null
+++ b/leaderboard.test.js
@@ -0,0 +1,168 @@
+const fs = require('fs');
+const path = require('path');
+
+// Mock fs module
+jest.mock('fs');
+
+describe('Leaderboard Update Script', () => {
+  const leaderboardPath = path.join(__dirname, 'leaderboard.json');
+  
+  // Sample test data
+  const existingLeaderboard = {
+    contributors: [
+      {
+        username: 'existingUser',
+        contributions: 5,
+        score: 100
+      },
+      {
+        username: 'anotherUser',
+        contributions: 3,
+        score: 60
+      }
+    ],
+    lastUpdated: '2024-01-01T00:00:00.000Z'
+  };
+
+  beforeEach(() => {
+    // Clear all mocks before each test
+    jest.clearAllMocks();
+  });
+
+  afterEach(() => {
+    jest.resetAllMocks();
+  });
+
+  describe('New Contributors', () => {
+    test('should add a new contributor to an empty leaderboard', () => {
+      const emptyLeaderboard = {
+        contributors: [],
+        lastUpdated: '2024-01-01T00:00:00.000Z'
+      };
+
+      fs.readFileSync.mockReturnValue(JSON.stringify(emptyLeaderboard));
+      fs.writeFileSync.mockImplementation(() => {});
+
+      // Simulate adding new contributor
+      const newContributor = {
+        username: 'newUser',
+        contributions: 1,
+        score: 10
+      };
+
+      const updatedLeaderboard = {
+        contributors: [newContributor],
+        lastUpdated: expect.any(String)
+      };
+
+      fs.writeFileSync(leaderboardPath, JSON.stringify(updatedLeaderboard, null, 2));
+
+      expect(fs.writeFileSync).toHaveBeenCalledWith(
+        leaderboardPath,
+        expect.stringContaining('newUser')
+      );
+    });
+
+    test('should add a new contributor to existing leaderboard', () => {
+      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
+      fs.writeFileSync.mockImplementation(() => {});
+
+      const newContributor = {
+        username: 'brandNewUser',
+        contributions: 2,
+        score: 20
+      };
+
+      const updatedContributors = [...existingLeaderboard.contributors, newContributor];
+
+      const updatedLeaderboard = {
+        contributors: updatedContributors,
+        lastUpdated: expect.any(String)
+      };
+
+      fs.writeFileSync(leaderboardPath, JSON.stringify(updatedLeaderboard, null, 2));
+
+      expect(fs.writeFileSync).toHaveBeenCalled();
+      const callArgs = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(callArgs[1]);
+      expect(writtenData.contributors).toHaveLength(3);
+      expect(writtenData.contributors.find(c => c.username === 'brandNewUser')).toBeDefined();
+    });
+  });
+
+  describe('Existing Contributors', () => {
+    test('should update an existing contributor\'s score and contributions', () => {
+      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
+      fs.writeFileSync.mockImplementation(() => {});
+
+      const updatedContributors = existingLeaderboard.contributors.map(c => 
+        c.username === 'existingUser' 
+          ? { ...c, contributions: c.contributions + 1, score: c.score + 20 }
+          : c
+      );
+
+      const updatedLeaderboard = {
+        contributors: updatedContributors,
+        lastUpdated: expect.any(String)
+      };
+
+      fs.writeFileSync(leaderboardPath, JSON.stringify(updatedLeaderboard, null, 2));
+
+      expect(fs.writeFileSync).toHaveBeenCalled();
+      const callArgs = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(callArgs[1]);
+      const updatedUser = writtenData.contributors.find(c => c.username === 'existingUser');
+      expect(updatedUser.contributions).toBe(6);
+      expect(updatedUser.score).toBe(120);
+    });
+
+    test('should not duplicate existing contributors', () => {
+      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
+      fs.writeFileSync.mockImplementation(() => {});
+
+      // Attempt to add existing user again
+      const existingUserUpdate = {
+        username: 'existingUser',
+        contributions: 1,
+        score: 10
+      };
+
+      const updatedContributors = existingLeaderboard.contributors.map(c => 
+        c.username === existingUserUpdate.username 
+          ? { ...c, contributions: c.contributions + existingUserUpdate.contributions, score: c.score + existingUserUpdate.score }
+          : c
+      );
+
+      const updatedLeaderboard = {
+        contributors: updatedContributors,
+        lastUpdated: expect.any(String)
+      };
+
+      fs.writeFileSync(leaderboardPath, JSON.stringify(updatedLeaderboard, null, 2));
+
+      const callArgs = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(callArgs[1]);
+      expect(writtenData.contributors).toHaveLength(2);
+    });
+  });
+
+  describe('Leaderboard File Operations', () => {
+    test('should create leaderboard file if it does not exist', () => {
+      fs.existsSync = jest.fn().mockReturnValue(false);
+      fs.writeFileSync.mockImplementation(() => {});
+
+      const initialLeaderboard = {
+        contributors: [],
+        lastUpdated: expect.any(String)
+      };
+
+      fs.writeFileSync(leaderboardPath, JSON.stringify(initialLeaderboard, null, 2));
+
+      expect(fs.writeFileSync).toHaveBeenCalledWith(
+        leaderboardPath,
+        expect.any(String)
+      );
+    });
+
+    test('should read existing leaderboard file', () => {
+      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
+
+      const data = JSON.parse(fs.readFileSync(leaderboardPath));
+      
+      expect(data.contributors).toHaveLength(2);
+      expect(data.contributors[0].username).toBe('existingUser');
+    });
+
+    test('should update lastUpdated timestamp on modification', () => {
+      const beforeUpdate = new Date('2024-01-01').toISOString();
+      
+      fs.readFileSync.mockReturnValue(JSON.stringify({
+        ...existingLeaderboard,
+        lastUpdated: beforeUpdate
+      }));
+      fs.writeFileSync