import { createApp } from "./app";
import { getPort } from "./config";

const port = getPort(process.env.PORT);

const app = createApp();

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
