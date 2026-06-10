import express from 'express';
import { createExpressApp } from './app';

const app = createExpressApp();

// Add body parsing middleware with size limits
app.use(express.json({ 
  limit: '10mb' // Conservative limit for JSON body size
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Existing server setup code would continue here