import { spawn } from "child_process";

async function run() {
  console.log("Starting server...");
  const server = spawn("npm", ["run", "dev"], {
    stdio: "pipe",
  });

  server.stdout.on("data", (data) => {
    console.log(`[server stdout]: ${data}`);
  });

  server.stderr.on("data", (data) => {
    console.error(`[server stderr]: ${data}`);
  });

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Testing unknown route...");
  try {
    const res = await fetch("http://localhost:4000/some-unknown-route");
    const text = await res.text();
    const isJson = res.headers.get("content-type")?.includes("application/json");

    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${res.headers.get("content-type")}`);
    console.log(`Body: ${text}`);

    if (res.status === 404 && isJson) {
      console.log("✅ Validation passed: Unknown route returned 404 JSON.");
      server.kill();
      process.exit(0);
    } else {
      console.error("❌ Validation failed.");
      server.kill();
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Request failed:", error);
    server.kill();
    process.exit(1);
  }
}

run();
