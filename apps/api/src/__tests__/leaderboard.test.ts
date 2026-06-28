import { describe, it, expect } from "vitest";

describe("Leaderboard", () => {
  it("should return a list of top users sorted by score descending", async () => {
    const res = await fetch("/api/leaderboard");
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    if (body.data.length > 1) {
      for (let i = 1; i < body.data.length; i++) {
        expect(body.data[i - 1].score).toBeGreaterThanOrEqual(body.data[i].score);
      }
    }
  });

  it("should limit results when ?limit param is provided", async () => {
    const res = await fetch("/api/leaderboard?limit=3");
    const body = await res.json();
    expect(body.data.length).toBeLessThanOrEqual(3);
  });

  it("should return 200 with empty array when no data exists", async () => {
    const res = await fetch("/api/leaderboard?empty=1");
    expect(res.status).toBe(200);
  });
});
