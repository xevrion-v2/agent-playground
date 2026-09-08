/**
 * Minimal validation that the /health endpoint returns Cache-Control: no-store.
 *
 * Usage:
 *   1. Start the API server (npm run dev in apps/api).
 *   2. Run: npx tsx src/health.test.ts
 */

const BASE = `http://localhost:${process.env.PORT || 4000}`;

async function checkHealthNoCache(): Promise<void> {
  const res = await fetch(`${BASE}/health`);
  const body = await res.json();

  // Verify JSON shape is preserved
  if (body.status !== "ok" || body.service !== "taskflow-api") {
    console.error("FAIL: /health JSON body changed shape", body);
    process.exit(1);
  }

  // Verify Cache-Control header
  const cacheControl = res.headers.get("cache-control");
  if (!cacheControl || !cacheControl.includes("no-store")) {
    console.error(
      `FAIL: /health Cache-Control is "${cacheControl}", expected "no-store"`,
    );
    process.exit(1);
  }

  console.log("PASS: /health returns Cache-Control: no-store");
  console.log(`  status: ${body.status}`);
  console.log(`  service: ${body.service}`);
  console.log(`  Cache-Control: ${cacheControl}`);
}

checkHealthNoCache().catch((err) => {
  console.error("FAIL: /health validation errored", err);
  process.exit(1);
});
