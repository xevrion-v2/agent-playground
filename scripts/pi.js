import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));

/** High-precision PI via Machin formula (Python decimal backend). */
export function computePi(digits = 120) {
  if (digits < 1 || digits > 500) throw new RangeError("digits 1-500");
  const r = spawnSync("python", [join(DIR, "pi_compute.py"), String(digits)], {
    encoding: "utf8",
  });
  if (r.status !== 0) throw new Error(r.stderr?.trim() || "pi compute failed");
  return r.stdout.trim();
}

if (process.argv[1]?.endsWith("pi.js")) {
  console.log(computePi(Number(process.argv[2] || 120)));
}
