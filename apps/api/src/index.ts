import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// ... other middleware and routes ...

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    data: { uptime: process.uptime() }
  });
});

// ... rest of app ...
  console.log(`TaskFlow API listening on port ${port}`);
});
