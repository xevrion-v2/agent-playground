import app from "./app";
import { parsePort } from "./config";

const port = parsePort();

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
