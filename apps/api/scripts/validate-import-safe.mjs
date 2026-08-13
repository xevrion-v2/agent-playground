import net from "node:net";

const port = 4098;

// If importing app.ts already bound a port, this probe would fail to bind.
const probe = net.createServer();
await new Promise((resolve, reject) => {
  probe.once("error", reject);
  probe.listen(port, resolve);
});
probe.close();

const { default: app } = await import("../src/app.ts");

if (typeof app.listen !== "function") {
  console.error("FAIL: imported module is not an Express app");
  process.exit(1);
}

const server = app.listen(port, () => {
  console.log("PASS: app.ts is import-safe and only binds a port when listen() is called explicitly");
  server.close();
});
