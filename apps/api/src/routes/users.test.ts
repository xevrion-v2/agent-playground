import { describe, it, expect } from "vitest";
import express from "express";
import usersRouter from "./users";

function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/users", usersRouter);
  return app;
}

function request(app: express.Express, method: string, path: string, body?: unknown): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const http = require("http");
    const server = app.listen(0, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 4001;
      const payload = body !== undefined ? JSON.stringify(body) : undefined;
      const options: http.RequestOptions = {
        hostname: "localhost",
        port,
        path,
        method,
        headers: payload ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) } : {},
      };
      const req = http.request(options, (res: any) => {
        let data = "";
        res.on("data", (chunk: string) => (data += chunk));
        res.on("end", () => {
          server.close();
          try {
            resolve({ status: res.statusCode ?? 0, body: data ? JSON.parse(data) : {} });
          } catch {
            resolve({ status: res.statusCode ?? 0, body: { raw: data } });
          }
        });
      });
      req.on("error", (err: Error) => { server.close(); reject(err); });
      if (payload) req.write(payload);
      req.end();
    });
  });
}

describe("POST /users validation", () => {
  const app = createApp();

  it("rejects non-object body (array)", async () => {
    const res = await request(app, "POST", "/users", [1, 2, 3]);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Request body must be a JSON object.");
  });

  it("rejects non-object body (string) — handled by express.json() strict mode", async () => {
    const res = await request(app, "POST", "/users", "hello");
    expect(res.status).toBe(400);
  });

  it("rejects non-object body (null) — handled by express.json() strict mode", async () => {
    const res = await request(app, "POST", "/users", null);
    expect(res.status).toBe(400);
  });

  it("rejects body without email", async () => {
    const res = await request(app, "POST", "/users", { name: "Test" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("A valid email is required.");
  });

  it("rejects invalid email", async () => {
    const res = await request(app, "POST", "/users", { email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("A valid email is required.");
  });

  it("rejects empty email", async () => {
    const res = await request(app, "POST", "/users", { email: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("A valid email is required.");
  });

  it("creates user with valid email and normalizes it", async () => {
    const res = await request(app, "POST", "/users", { email: "  Test@Example.COM  " });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("test@example.com");
    expect(res.body.data.id).toMatch(/^usr_/);
  });

  it("normalizes optional name", async () => {
    const res = await request(app, "POST", "/users", { email: "a@b.com", name: "  John  " });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("John");
  });

  it("ignores client-controlled id", async () => {
    const res = await request(app, "POST", "/users", { email: "a@b.com", id: "my-custom-id" });
    expect(res.status).toBe(201);
    expect(res.body.data.id).not.toBe("my-custom-id");
    expect(res.body.data.id).toMatch(/^usr_/);
  });

  it("ignores unrelated extra fields", async () => {
    const res = await request(app, "POST", "/users", { email: "a@b.com", role: "admin", password: "hunter2" });
    expect(res.status).toBe(201);
    expect(res.body.data.role).toBeUndefined();
    expect(res.body.data.password).toBeUndefined();
    expect(res.body.data.email).toBe("a@b.com");
  });
});
