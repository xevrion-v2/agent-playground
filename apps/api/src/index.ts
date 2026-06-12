import { pathToFileURL } from "node:url";

import app from "./app.js";

const port = process.env.PORT || 4000;

function isEntrypoint() {
  return Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
}

if (isEntrypoint()) {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

export default app;
