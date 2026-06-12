import { createServer } from "node:net";

const getAvailablePort = async () =>
  await new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on("error", reject);
    probe.listen(0, () => {
      const address = probe.address();
      probe.close(() => {
        if (address && typeof address === "object") {
          resolve(address.port);
          return;
        }

        reject(new Error("Could not resolve an available TCP port"));
      });
    });
  });

const port = await getAvailablePort();
process.env.PORT = String(port);

const originalExit = process.exit;
const originalLog = console.log;
const originalError = console.error;
let output = "";
const timeoutMs = 15_000;

console.log = (...args) => {
  output += `${args.join(" ")}\n`;
  originalLog(...args);
};

console.error = (...args) => {
  output += `${args.join(" ")}\n`;
  originalError(...args);
};

const exitCode = await new Promise(async (resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error("Timed out waiting for API server to shut down cleanly"));
  }, timeoutMs);

  process.exit = (code = 0) => {
    clearTimeout(timeout);
    resolve(code);
  };

  try {
    await import("../apps/api/src/index.ts");
    process.emit("SIGTERM", "SIGTERM");
  } catch (error) {
    clearTimeout(timeout);
    reject(error);
  }
});

process.exit = originalExit;
console.log = originalLog;
console.error = originalError;

if (exitCode !== 0) {
  console.error(output);
  console.error(`Expected exit code 0, received code=${exitCode}`);
  process.exit(1);
}

if (!output.includes("TaskFlow API server closed cleanly")) {
  console.error(output);
  console.error("Expected graceful shutdown confirmation in API output");
  process.exit(1);
}

console.log("API shutdown validation passed");
