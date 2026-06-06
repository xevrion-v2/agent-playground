import express from 'express';
import cors from 'cors';

const app = express();

// Configure request body size limit (conservative limit of 100kb for JSON bodies)
// This helps prevent abuse from extremely large request bodies
app.use(express.json({ 
  limit: '100kb',
  type: 'application/json'
}));

// Also configure urlencoded body parser with same limit
app.use(express.urlencoded({ 
  extended: true,
  limit: '100kb'
}));

// Enable CORS
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});