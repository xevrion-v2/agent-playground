import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { updateLeaderboard } from './update-leaderboard.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('update-leaderboard', () => {
  const testFilePath = path.resolve(__dirname, 'test-leaderboard.json');

  beforeEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('should create leaderboard.json if it does not exist and add new contributor with count 1', () => {
    expect(fs.existsSync(testFilePath)).toBe(false);
    
    updateLeaderboard(testFilePath, 'alice');
    
    expect(fs.existsSync(testFilePath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(content).toEqual({ alice: 1 });
  });

  it('should add a new contributor to an existing leaderboard with count 1', () => {
    fs.writeFileSync(testFilePath, JSON.stringify({ bob: 3 }, null, 2) + '\n');
    
    updateLeaderboard(testFilePath, 'alice');
    
    const content = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(content).toEqual({ bob: 3, alice: 1 });
  });

  it('should increment an existing contributor in the leaderboard', () => {
    fs.writeFileSync(testFilePath, JSON.stringify({ bob: 3, alice: 2 }, null, 2) + '\n');
    
    updateLeaderboard(testFilePath, 'alice');
    
    const content = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(content).toEqual({ bob: 3, alice: 3 });
  });
});
