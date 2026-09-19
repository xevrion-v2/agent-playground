app.use('/health', healthRoutes);

app.get('/', (_req, res) => {
  res.json({
    status: 'success',
    data: { message: 'API is running' }
  });
});

export default app;