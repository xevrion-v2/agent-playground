import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const probe = path.join(scriptDir, "_probe-app-import.ts");

const child = spawn("npx", ["tsx", probe], { cwd: scriptDir, stdio: "pipe", shell: true });

let stdout = "";
let stderr = "";
child.stdout.on("data", (d) => (stdout += d.toString()));
child.stderr.on("data", (d) => (stderr += d.toString()));

const exitCode = await new Promise((resolve) => child.on("exit", resolve));

if (exitCode !== 0 || !stdout.includes("OK")) {
  console.error("Importing app.ts unexpectedly failed or did not export a usable Express app.");
  console.error(stderr);
  process.exit(1);
}

console.log("OK: app.ts can be imported without binding a port.");
process.exit(0);
