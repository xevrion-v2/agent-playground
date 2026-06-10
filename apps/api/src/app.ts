import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Configure body parsing with size limits
app.use(express.json({ 
  limit: '10mb' // Conservative limit for JSON body size
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Existing routes and middleware would go here

export default app;

// The 10MB limit is set conservatively to prevent potential DoS attacks
// while allowing reasonable JSON payloads for the TaskFlow API