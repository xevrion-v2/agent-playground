import express from 'express';
import type { Application } from 'eject';

// Set up the express app instance with request body limit
const app = express();

// Configure JSON body size limit
// Limit JSON body size to 10mb - this is a conservative limit to prevent large payload attacks
// while still allowing reasonably large JSON payloads for task data
app.use(express.json({ 
  limit: '10mb',
  // Default limit: 100kb
  // This helps prevent DoS attacks via large payload requests
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

export default app;
