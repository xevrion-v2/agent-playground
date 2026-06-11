
// Health check endpoint (also at root for load balancers)
app.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    data: { healthy: true }
  });
});

// Error handling