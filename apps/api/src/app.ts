import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Apply security middleware
app.use(helmet());

// Apply CORS middleware
app.use(cors());

// Configure request body parsing with size limits
// Conservative limit set to 100kb for JSON bodies to prevent abuse
// This helps protect against DOS attacks via large payload submissions
const JSON_BODY_SIZE_LIMIT = '100kb';
app.use(express.json({ 
  limit: JSON_BODY_SIZE_LIMIT,
  // Only allow JSON content type for API security
  type: 'application/json'
}));

// URL encoded bodies are not needed for this API
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

export default app;