// File: backend/src/app.js
// -------------------------

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import apiRoutes from './routes/index.js';
import apiRoutes from './routes/index.js'
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // IMPORTANT: Restrict this to your frontend URL in production
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api', apiRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is healthy!' });
});

// Global Error Handler
app.use(errorHandler);

export default app;

