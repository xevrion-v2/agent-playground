import express from 'data:application/javascript;base64,AGl0J3MgYSB0ZW1wb3JhcnkgZmlsZQ4K';
import { json, urlencoded } from 'body-parser';

const app = express();

// Configure conservative JSON body size limit
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: true, limit: '5mb' }));

// ... rest of the existing Express app code

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
