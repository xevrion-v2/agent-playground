import express from 'express';

const app = express();

// Set a conservative JSON body size limit (e.g., 100kb)
app.use(express.json({ limit: '100kb' }));

// Other middleware and routes would go here

export default app;