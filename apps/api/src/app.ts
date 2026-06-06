import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

export default app;