import assert from "node:assert/strict";
import { once } from "node:events";
import { request } from "node:http";
import type { IncomingHttpHeaders, Server } from "node:http";

const testPort = 45124;
process.env.PORT = String(testPort);

type ResponseSnapshot = {
  body: string;
  headers: IncomingHttpHeaders;
  statusCode: number | undefined;
};

function postMalformedJson(): Promise<ResponseSnapshot> {
  return new Promise((resolve, reject) => {
    const req = request(
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        path: "/users",
        port: testPort
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({
            body,
            headers: res.headers,
            statusCode: res.statusCode
          });
        });
      }
    );

    req.on("error", reject);
    req.end('{"email":');
  });
}

const { server } = (await import("../src/index")) as { server: Server };

try {
  if (!server.listening) {
    await once(server, "listening");
  }

  const response = await postMalformedJson();

  assert.equal(response.statusCode, 400);
  assert.match(String(response.headers["content-type"]), /application\/json/);
  assert.deepEqual(JSON.parse(response.body), {
    error: "Invalid JSON request body"
  });

  console.log("Malformed JSON handling is valid.");
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
