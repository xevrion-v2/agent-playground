app.use('/api/health', healthRoutes);

app.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    data: { healthy: true }
  });
});

export default app;