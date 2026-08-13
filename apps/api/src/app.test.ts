import assert from "node:assert/strict";
import test from "node:test";

import express from "express";

test("app module can be imported without starting a listener", async () => {
  const originalListen = express.application.listen;
  let listenCalls = 0;

  express.application.listen = function patchedListen(...args: Parameters<typeof originalListen>) {
    listenCalls += 1;
    return originalListen.apply(this, args);
  };

  try {
    const { app } = await import("./app");

    assert.equal(listenCalls, 0);
    assert.equal(typeof app.listen, "function");
  } finally {
    express.application.listen = originalListen;
  }
});
