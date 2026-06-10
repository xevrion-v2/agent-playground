import express from 'express';

const app = express();

// Apply middleware

// Apply middleware
app.use(express.json());
// Set conservative request body size limit
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(express.text({ limit: '100kb' }));

// Routes
app.get('/', (req, res) => {

export default app;

// Expected request body size limit: 100kb
// This limits JSON payloads to 100kb to prevent large payload attacks
// and ensures the API remains responsive under normal usage