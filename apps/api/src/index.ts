import express, { Request, Response, NextFunction } from "express";
import { pathToFileURL } from "node:url";

import usersRouter from "./routes/users";

const port = process.env.PORT || 4000;
export function createApp(bodySizeLimit = process.env.BODY_SIZE_LIMIT || "100kb") {
  const app = express();

  app.use(express.json({ limit: bodySizeLimit }));

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if ((err as any).type === "entity.too.large" || (err as any).status === 413) {
      return res.status(413).json({
        error: "Payload Too Large",
        message: `Request body exceeds the maximum allowed size of ${bodySizeLimit}.`,
      });
    }
    next(err);
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  return app;
}

const app = createApp();
const isMainModule =
  !!process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

export default app;
