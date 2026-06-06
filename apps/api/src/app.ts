import express from 'express';
import type { Application } from 'express';

const app: Application = express();

// Add a conservative JSON body size limit
app.use(express.json({ limit: '10mb' }));

// Existing app configuration would continue here...
export default app;