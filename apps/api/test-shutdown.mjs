import { spawn } from "child_process";

async function runTest() {
  console.log("Starting API server...");
  const devProcess = spawn("npm", ["run", "dev", "--", "-p", "3003"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "3003", NODE_ENV: "development" },
  });

  let serverReady = false;
  let shutDownGracefully = false;

  devProcess.stdout.on("data", (data) => {
    const output = data.toString();
    console.log(output);
    if (output.includes("listening on port")) {
      serverReady = true;
    }
    if (output.includes("Shutting down gracefully...")) {
      shutDownGracefully = true;
    }
    if (output.includes("HTTP server closed.")) {
      console.log("SUCCESS: Graceful shutdown verified.");
      process.exit(0);
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

  console.log("Sending SIGTERM...");
  devProcess.kill("SIGTERM");

  // Wait for shutdown to complete
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!shutDownGracefully) {
    console.error("Test failed: Server did not shut down gracefully.");
    devProcess.kill();
    process.exit(1);
  }
}

runTest();
