import express from 'express';

const app = express();

// Configure body parsing with conservative size limits
// Body size limit set to 10mb to prevent potential DoS attacks
// Issue: Add request body size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));