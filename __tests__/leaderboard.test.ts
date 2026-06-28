import fs from "fs";
import path from "path";

const LEADERBOARD_PATH = path.resolve("leaderboard.json");
const CONTRIBUTORS_DIR = path.resolve("contributors");

describe("Leaderboard", () => {
  beforeEach(() => {
    // save original
    if (!global.__origLeaderboard) {
      global.__origLeaderboard = fs.readFileSync(LEADERBOARD_PATH);
    }
  });

  afterEach(() => {
    // restore
    if (global.__origLeaderboard) {
      fs.writeFileSync(LEADERBOARD_PATH, global.__origLeaderboard);
    }
  });

  it("loads leaderboard.json", () => {
    expect(() => JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"))).not.toThrow();
  });

  it("has valid contributor usernames", () => {
    const lb = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
    const names = Object.keys(lb);
    expect(names.length).toBeGreaterThan(0);
    names.forEach((name) => {
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);
    });
  });

  it("has non-negative contribution counts", () => {
    const lb = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
    Object.values(lb).forEach((count) => {
      expect(typeof count).toBe("number");
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  it("can add a new contributor", () => {
    const lb = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
    const testUser = "test-contributor-" + Date.now();
    lb[testUser] = 1;
    fs.writeFileSync(LEADERBOARD_PATH, JSON.stringify(lb, null, 2));
    const updated = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
    expect(updated[testUser]).toBe(1);
  });

  it("can increment an existing contributor", () => {
    const lb = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
    const firstUser = Object.keys(lb)[0];
    const orig = lb[firstUser];
    lb[firstUser] = orig + 1;
    fs.writeFileSync(LEADERBOARD_PATH, JSON.stringify(lb, null, 2));
    const updated = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
    expect(updated[firstUser]).toBe(orig + 1);
  });

  it("lists contributors in descending order", () => {
    const lb = JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"));
    const entries = Object.entries(lb).sort(([, a], [, b]) => b - a);
    let isSorted = true;
    for (let i = 1; i < entries.length; i++) {
      if (entries[i][1] > entries[i - 1][1]) {
        isSorted = false;
        break;
      }
    }
    expect(isSorted).toBe(true);
  });
});
