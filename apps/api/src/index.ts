import { app } from "./app";

const port = process.env.PORT || 4000;

/**
 * Runtime entrypoint: start the Express server.
 *
 * App construction lives in ./app.ts so that importing the API module
 * does not automatically bind a port. This keeps route tests fragile-free.
 */
app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
