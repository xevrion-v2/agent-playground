import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import { Server } from "http";
import request from "supertest";
import leaderboardRouter from "../src/routes/leaderboard";

let app: express.Express;
let server: Server;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/leaderboard", leaderboardRouter);
  server = app.listen(0);
});

afterAll(() => server.close());

describe("GET /leaderboard", () => {
  it("returns 200 with consistent envelope", async () => {
    const res = await request(app).get("/leaderboard").expect(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("returns entries sorted by score descending", async () => {
    const res = await request(app).get("/leaderboard");
    const data = res.body.data;
    for (let i = 1; i < data.length; i++) {
      expect(data[i].score).toBeLessThanOrEqual(data[i - 1].score);
    }
  });
});

describe("POST /leaderboard/update", () => {
  it("returns 400 when user is missing", async () => {
    const res = await request(app)
      .post("/leaderboard/update")
      .send({ points: 5 })
      .expect(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when points is not positive", async () => {
    const res = await request(app)
      .post("/leaderboard/update")
      .send({ user: "testuser", points: -1 })
      .expect(400);
    expect(res.body).toHaveProperty("error");
  });

  it("adds new contributor and returns updated leaderboard", async () => {
    const user = "new-contributor-" + Date.now();
    const res = await request(app)
      .post("/leaderboard/update")
      .send({ user, points: 5 })
      .expect(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body.data.some((e: any) => e.user === user)).toBe(true);
  });

  it("increments existing contributor score", async () => {
    const user = "increment-test-" + Date.now();
    await request(app).post("/leaderboard/update").send({ user, points: 3 });
    const res = await request(app).post("/leaderboard/update").send({ user, points: 4 });
    const entry = res.body.data.find((e: any) => e.user === user);
    expect(entry).toBeTruthy();
    expect(entry.score).toBe(7);
  });
});
