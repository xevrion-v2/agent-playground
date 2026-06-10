// Add the body size limit configuration
app.use(express.json({ limit: '10mb' }));

// Existing app configuration continues...