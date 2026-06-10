import express from 'express';
import { json, urlencoded } from 'body-parser';

const app = express();

// Configure conservative JSON body size limit - 5MB
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: true, limit: '5mb' }));

// ... existing code
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
