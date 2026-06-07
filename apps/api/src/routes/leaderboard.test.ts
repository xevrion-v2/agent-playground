import request from "supertest";
import { app } from "../index.js";

beforeEach(() => {
  // Reset the in-memory leaderboard between tests by re-importing would be
  // ideal, but since the module is loaded once we rely on the API itself.
  // We seed known state by posting and using unique users per test.
});

describe("GET /leaderboard", () => {
  it("should return 200 with an envelope containing status and data", async () => {
    const res = await request(app).get("/leaderboard");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should return contributors sorted by merged count (descending)", async () => {
    // Seed two contributors
    await request(app)
      .post("/leaderboard")
      .send({ user: "sort-test-a", points: 5 });
    await request(app)
      .post("/leaderboard")
      .send({ user: "sort-test-b", points: 12 });

    const res = await request(app).get("/leaderboard");
    expect(res.status).toBe(200);

    const items = res.body.data;
    const idxA = items.findIndex(
      (e: { user: string }) => e.user === "sort-test-a"
    );
    const idxB = items.findIndex(
      (e: { user: string }) => e.user === "sort-test-b"
    );
    expect(idxB).toBeLessThan(idxA);
  });
});

describe("POST /leaderboard", () => {
  it("should add a new contributor and return their entry", async () => {
    const res = await request(app)
      .post("/leaderboard")
      .send({ user: "new-contributor", points: 3 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data.user).toBe("new-contributor");
    expect(res.body.data.merged).toBe(3);
  });

  it("should increment an existing contributor's count", async () => {
    await request(app)
      .post("/leaderboard")
      .send({ user: "inc-user", points: 2 });
    const res = await request(app)
      .post("/leaderboard")
      .send({ user: "inc-user", points: 4 });

    expect(res.status).toBe(200);
    expect(res.body.data.merged).toBe(6);
  });

  it("should return 400 when user is missing", async () => {
    const res = await request(app)
      .post("/leaderboard")
      .send({ points: 1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/user/i);
  });

  it("should return 400 when user is empty string", async () => {
    const res = await request(app)
      .post("/leaderboard")
      .send({ user: "", points: 1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/user/i);
  });

  it("should return 400 when points is negative", async () => {
    const res = await request(app)
      .post("/leaderboard")
      .send({ user: "neg-user", points: -3 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/points/i);
  });

  it("should return 400 when points is not an integer", async () => {
    const res = await request(app)
      .post("/leaderboard")
      .send({ user: "float-user", points: 2.5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/points/i);
  });

  it("should return 400 when points is not a number", async () => {
    const res = await request(app)
      .post("/leaderboard")
      .send({ user: "str-user", points: "abc" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/points/i);
  });

  it("should return 400 when points is missing", async () => {
    const res = await request(app)
      .post("/leaderboard")
      .send({ user: "no-points" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/points/i);
  });
});
