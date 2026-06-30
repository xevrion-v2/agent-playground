app.use('/health', healthRoutes);

app.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    data: { healthy: true }
  });
});

// ... existing routes ...