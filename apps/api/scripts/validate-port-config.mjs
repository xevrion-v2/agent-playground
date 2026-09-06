import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(import.meta.url), "../../../../");

function runTsx(port) {
  return spawnSync("npx", ["tsx", "apps/api/src/index.ts"], {
    env: { ...process.env, PORT: port },
    timeout: 3000,
    cwd: root,
    shell: true,
    encoding: "utf8",
  });
}

function expectFail(port) {
  const r = runTsx(port);
  const out = (r.stdout ?? "") + (r.stderr ?? "");
  if (r.status === 0) throw new Error(`Expected failure for PORT=${port} but exited 0`);
  if (!out.includes("Invalid PORT")) throw new Error(`No "Invalid PORT" message for PORT=${port}. Got: ${out.slice(0, 200)}`);
}

expectFail("-1");
expectFail("99999");
expectFail("abc");

console.log("OK: invalid PORT values correctly rejected with clear error messages.");
process.exit(0);
