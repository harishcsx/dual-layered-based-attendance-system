import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is healthy!' });
});

export default app;

