import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { app } from "../src/index";

describe("health route", () => {
  let server: ReturnType<typeof app.listen>;
  let baseUrl: string;

  before(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address();
        assert.ok(address && typeof address === "object");
        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it("returns a normalized response envelope", async () => {
    const response = await fetch(`${baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      status: "ok",
      data: {
        service: "taskflow-api"
      }
    });
  });
});
