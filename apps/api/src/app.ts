app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', getHealth);

// API routes
app.use('/api', routes);