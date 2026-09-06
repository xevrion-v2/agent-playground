import { createServer } from "node:http";

import app from "../src/app";

const server = createServer(app);

await new Promise<void>((resolve) => {
  server.listen(0, "127.0.0.1", resolve);
});

try {
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Expected the health check server to listen on a TCP port");
  }

  const response = await fetch(`http://127.0.0.1:${address.port}/health`);
  const body = await response.json();
  const cacheControl = response.headers.get("cache-control");

  if (response.status !== 200) {
    throw new Error(`Expected 200 from /health, received ${response.status}`);
  }

  if (cacheControl !== "no-store") {
    throw new Error(`Expected Cache-Control no-store, received ${cacheControl}`);
  }

  const expectedBody = JSON.stringify({ status: "ok", service: "taskflow-api" });

  if (JSON.stringify(body) !== expectedBody) {
    throw new Error(`Unexpected /health body: ${JSON.stringify(body)}`);
  }

  console.log("GET /health returns no-store cache policy and the expected body.");
} finally {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
