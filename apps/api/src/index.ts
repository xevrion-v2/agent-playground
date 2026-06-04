/**
 * TaskFlow API runtime entrypoint.
 *
 * Imports the configured Express app and starts the HTTP server.
 * For importing the app without starting a server (e.g. in tests),
 * use `import app from "./app"` instead.
 */
import app from "./app";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
