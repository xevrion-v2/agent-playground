import { createApp, createServer } from "./app";

const app = createApp();
createServer(app);

export { app };
