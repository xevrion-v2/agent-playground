import express from 'express';
import { json } from 'body-parser';

const app = express();

// Configure request body size limit
// Set conservative limit of 100kb for JSON payloads
app.use(json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Add other routes and middleware...

export { app };

// Expected body size limit: 100kb for all JSON and URL-encoded requests