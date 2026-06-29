import express from "express";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Custom JSON parser that allows non-object bodies to reach the route for validation
app.use((req, res, next) => {
  if (req.headers["content-type"]?.includes("application/json")) {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body || body.trim() === "") {
        req.body = {};
        return next();
      }
      try {
        const parsed = JSON.parse(body);
        req.body = parsed;
        next();
      } catch (err: any) {
        return res.status(400).json({
          error: "Invalid JSON: " + err.message,
        });
      }
    });
  } else {
    express.json()(req, res, next);
  }
});

app.get("/health", (_req: express.Request, res: express.Response) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

export default app;
