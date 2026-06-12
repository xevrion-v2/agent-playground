import { spawn } from "child_process";
import assert from "assert";

async function runTest() {
  console.log("Starting Next.js dev server...");
  const devProcess = spawn("npm", ["run", "dev", "--", "-p", "3001"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "3001" },
  });

  let serverReady = false;

  devProcess.stdout.on("data", (data) => {
    const output = data.toString();
    console.log(output);
    if (output.includes("Ready") || output.includes("started server on")) {
      serverReady = true;
    }
  });

  devProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  // Wait for server to be ready
  let attempts = 0;
  while (!serverReady && attempts < 30) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    attempts++;
  }

  if (!serverReady) {
    console.error("Server failed to start in time.");
    devProcess.kill();
    process.exit(1);
  }

  console.log("Fetching http://localhost:3001...");
  try {
    const res = await fetch("http://localhost:3001");
    console.log("Headers:");
    res.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const poweredBy = res.headers.get("x-powered-by");
    assert.strictEqual(poweredBy, null, "X-Powered-By header should be disabled");
    console.log("SUCCESS: X-Powered-By header is disabled.");
  } catch (error) {
    console.error("Test failed:", error);
    devProcess.kill();
    process.exit(1);
  }

  devProcess.kill();
  process.exit(0);
}

runTest();
