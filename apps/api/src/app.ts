import express from 'express';

const app = express();

// Add JSON body size limit middleware
// Set a conservative limit of 10mb for JSON payloads
app.use(express.json({ limit: '10mb' }));

// Existing Express app configuration would continue here...

export default app;