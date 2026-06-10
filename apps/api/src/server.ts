import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Configure a conservative JSON body size limit
// The limit is set to 200kb as a conservative value for JSON payloads
// This prevents potential DoS attacks from extremely large request bodies
app.use(bodyParser.json({ limit: '200kb' }));
app.use(bodyParser.urlencoded({ limit: '200kb', extended: true }));

// Alternative approach using express.json() (if bodyParser is not used directly)
// app.use(express.json({ limit: '200kb' }));
// app.use(express.urlencoded({ limit: '200kb', extended: true }));

// Rest of the application setup would go here
// app.listen() etc.

export default app;