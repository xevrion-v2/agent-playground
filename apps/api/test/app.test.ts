import assert from "node:assert/strict";
import test from "node:test";

import app, { createApp } from "../src/app.js";

type Layer = {
  route?: {
    path?: string;
  };
  name?: string;
  handle?: {
    stack?: Array<{
      route?: {
        path?: string;
      };
    }>;
  };
};

function getRoutes(target: unknown): Layer[] {
  return ((target as { _router?: { stack?: Layer[] } })._router?.stack ?? []).filter(Boolean);
}

test("app export registers the health endpoint", () => {
  const routes = getRoutes(app);
  const healthRoute = routes.find((layer) => layer.route?.path === "/health");

  assert.ok(healthRoute);
});

test("createApp mounts the users router", () => {
  const routes = getRoutes(createApp());
  const usersRouter = routes.find(
    (layer) =>
      layer.name === "router" &&
      layer.handle?.stack?.some((nestedLayer) => nestedLayer.route?.path === "/")
  );

  assert.ok(usersRouter);
});

test("index import stays side-effect free for smoke tests", async () => {
  const imported = await import("../src/index.js");

  assert.equal(imported.default, app);
});
