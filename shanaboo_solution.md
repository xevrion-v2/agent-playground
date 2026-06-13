 ```diff
--- /dev/null
+++ b/leaderboard.test.js
@@ -0,0 +1,195 @@
+const fs = require('fs');
+const path = require('path');
+
+// Mock fs module
+jest.mock('fs');
+
+describe('Leaderboard Update Script', () => {
+  const leaderboardPath = path.join(__dirname, 'leaderboard.json');
+  
+  // Mock console methods
+  let consoleLogSpy;
+  let consoleErrorSpy;
+  
+  beforeEach(() => {
+    // Clear all mocks before each test
+    jest.clearAllMocks();
+    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
+    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
+  });
+  
+  afterEach(() => {
+    consoleLogSpy.mockRestore();
+    consoleErrorSpy.mockRestore();
+    jest.resetModules();
+  });
+
+  describe('New Contributors', () => {
+    test('should add a new contributor to an empty leaderboard', () => {
+      const emptyLeaderboard = { contributors: [] };
+      fs.readFileSync.mockReturnValue(JSON.stringify(emptyLeaderboard));
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      const newContributor = {
+        username: 'newuser',
+        score: 100,
+        contributions: 5
+      };
+      
+      updateLeaderboard(newContributor);
+      
+      const writeCall = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(writeCall[1]);
+      
+      expect(writtenData.contributors).toHaveLength(1);
+      expect(writtenData.contributors[0].username).toBe('newuser');
+      expect(writtenData.contributors[0].score).toBe(100);
+      expect(writtenData.contributors[0].contributions).toBe(5);
+    });
+
+    test('should add a new contributor to existing leaderboard', () => {
+      const existingLeaderboard = {
+        contributors: [
+          { username: 'existinguser', score: 200, contributions: 10 }
+        ]
+      };
+      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      const newContributor = {
+        username: 'newuser',
+        score: 150,
+        contributions: 7
+      };
+      
+      updateLeaderboard(newContributor);
+      
+      const writeCall = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(writeCall[1]);
+      
+      expect(writtenData.contributors).toHaveLength(2);
+      expect(writtenData.contributors[1].username).toBe('newuser');
+    });
+
+    test('should initialize leaderboard file if it does not exist', () => {
+      fs.readFileSync.mockImplementation(() => {
+        throw new Error('ENOENT: no such file or directory');
+      });
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      const newContributor = {
+        username: 'firstuser',
+        score: 50,
+        contributions: 2
+      };
+      
+      updateLeaderboard(newContributor);
+      
+      const writeCall = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(writeCall[1]);
+      
+      expect(writtenData.contributors).toHaveLength(1);
+      expect(writtenData.contributors[0].username).toBe('firstuser');
+    });
+  });
+
+  describe('Existing Contributors', () => {
+    test('should update score for existing contributor', () => {
+      const existingLeaderboard = {
+        contributors: [
+          { username: 'existinguser', score: 200, contributions: 10 }
+        ]
+      };
+      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      const updatedContributor = {
+        username: 'existinguser',
+        score: 300,
+        contributions: 15
+      };
+      
+      updateLeaderboard(updatedContributor);
+      
+      const writeCall = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(writeCall[1]);
+      
+      expect(writtenData.contributors).toHaveLength(1);
+      expect(writtenData.contributors[0].score).toBe(300);
+      expect(writtenData.contributors[0].contributions).toBe(15);
+    });
+
+    test('should merge contributions for existing contributor', () => {
+      const existingLeaderboard = {
+        contributors: [
+          { username: 'existinguser', score: 200, contributions: 10 }
+        ]
+      };
+      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      const updatedContributor = {
+        username: 'existinguser',
+        score: 50,
+        contributions: 5
+      };
+      
+      updateLeaderboard(updatedContributor, { merge: true });
+      
+      const writeCall = fs.writeFileSync.mock.calls[0];
+      const writtenData = JSON.parse(writeCall[1]);
+      
+      expect(writtenData.contributors[0].score).toBe(250);
+      expect(writtenData.contributors[0].contributions).toBe(15);
+    });
+  });
+
+  describe('Error Handling', () => {
+    test('should handle invalid JSON in leaderboard file', () => {
+      fs.readFileSync.mockReturnValue('invalid json');
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      
+      expect(() => {
+        updateLeaderboard({ username: 'test', score: 100 });
+      }).toThrow();
+    });
+
+    test('should handle missing required fields', () => {
+      fs.readFileSync.mockReturnValue(JSON.stringify({ contributors: [] }));
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      
+      expect(() => {
+        updateLeaderboard({ score: 100 });
+      }).toThrow('Username is required');
+    });
+
+    test('should handle write errors', () => {
+      fs.readFileSync.mockReturnValue(JSON.stringify({ contributors: [] }));
+      fs.writeFileSync.mockImplementation(() => {
+        throw new Error('Write permission denied');
+      });
+      
+      const updateLeaderboard = require('./update-leaderboard');
+      
+      expect(() => {
+        updateLeaderboard({ username: 'test', score: 100 });
+      }).