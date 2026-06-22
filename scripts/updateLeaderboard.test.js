const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const updateLeaderboard = require('./updateLeaderboard');

test('Leaderboard update script', async (t) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'leaderboard-test-'));
  const testFile = path.join(tmpDir, 'leaderboard.json');

  await t.test('creates file and adds new contributor', () => {
    updateLeaderboard(testFile, 'alice');
    const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'));
    assert.deepStrictEqual(content, { alice: 1 });
  });

  await t.test('updates existing contributor', () => {
    updateLeaderboard(testFile, 'alice');
    const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'));
    assert.deepStrictEqual(content, { alice: 2 });
  });

  await t.test('adds another new contributor', () => {
    updateLeaderboard(testFile, 'bob');
    const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'));
    assert.deepStrictEqual(content, { alice: 2, bob: 1 });
  });

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
