import { createApp } from "./app";

const port = process.env.PORT || 4000;

createApp().listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
