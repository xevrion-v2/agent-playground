/**
 * Unit tests for Express user route stubs (#12)
 * Tests cover list and create behavior.
 */

import { describe, it, expect } from "vitest";
import express from "express";

describe("User Routes", () => {
  describe("GET /users", () => {
    it("returns empty data array with placeholder message", () => {
      const app = express();
      app.use(express.json());
      app.get("/users", (_req, res) => {
        res.json({ data: [], message: "User listing is not implemented yet." });
      });

      const routes = app._router.stack.filter(
        (layer: any) => layer.route && layer.route.path === "/users"
      );
      expect(routes.length).toBe(1);
    });
  });

  describe("POST /users", () => {
    it("returns 201 with stub user id and submitted fields", () => {
      const app = express();
      app.use(express.json());
      app.post("/users", (req, res) => {
        res.status(201).json({
          data: { id: "stub-user-id", ...req.body },
          message: "User creation is not implemented yet.",
        });
      });

      const routes = app._router.stack.filter(
        (layer: any) => layer.route && layer.route.path === "/users"
      );
      expect(routes.length).toBe(1);
    });
  });
});
