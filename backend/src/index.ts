// Import dependencies
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import helmet from 'helmet';
import logger from './config/logger';

// Load environment variables
dotenv.config();

// Create an instance of Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Secure HTTP headers

// Routes
import apiRoutes from './routes/api';
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.stack);
	res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}`);
});
