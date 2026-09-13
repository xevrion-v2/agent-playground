import { app, port } from "./app";

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
