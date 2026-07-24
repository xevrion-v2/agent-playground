import { pathToFileURL } from "node:url";

import { createApp } from "./app";

export const app = createApp();

const isDirectRun =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
