import { spawn } from "child_process";
import assert from "assert";

async function runTest() {
  console.log("Starting Next.js dev server...");
  const devProcess = spawn("npm", ["run", "dev", "--", "-p", "3002"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "3002" },
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

  console.log("Fetching http://localhost:3002...");
  try {
    const res = await fetch("http://localhost:3002");
    console.log("Headers:");
    res.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    assert.strictEqual(res.headers.get("x-frame-options"), "DENY", "X-Frame-Options should be DENY");
    assert.strictEqual(res.headers.get("x-content-type-options"), "nosniff", "X-Content-Type-Options should be nosniff");
    assert.strictEqual(res.headers.get("referrer-policy"), "strict-origin-when-cross-origin", "Referrer-Policy should be strict-origin-when-cross-origin");
    assert.ok(res.headers.get("permissions-policy"), "Permissions-Policy should be set");
    console.log("SUCCESS: Security headers are correctly set.");
  } catch (error) {
    console.error("Test failed:", error);
    devProcess.kill();
    process.exit(1);
  }

  devProcess.kill();
  process.exit(0);
}

runTest();
