import assert from "node:assert/strict";
import { AddressInfo } from "node:net";
import test from "node:test";

import app from "../src/app";

test("does not expose the Express X-Powered-By response header", async (t) => {
  const server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.once("listening", resolve);
  });

  t.after(() => {
    server.close();
  });

  const address = server.address() as AddressInfo;
  const response = await fetch(`http://127.0.0.1:${address.port}/health`);

  assert.equal(response.headers.has("x-powered-by"), false);
});
