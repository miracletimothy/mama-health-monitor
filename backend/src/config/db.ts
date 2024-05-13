import mongoose, { ConnectOptions } from 'mongoose';
import logger from './logger';

async function connectDB(): Promise<void> {
	const maxRetries = 5;
	let retries = 0;

	const uri = process.env.MONGO_DB_URI;
	if (!uri) {
		logger.error('MONGO_DB_URI environment variable is not defined');
		process.exit(1);
	}

	try {
		const options: ConnectOptions = {};

		await mongoose.connect(uri, options);
		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.error('Failed to connect to MongoDB:', error);
		retries++;
		logger.info(`Retrying connection (${retries}/${maxRetries}...)`);
		await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
	}

	if (retries >= maxRetries) {
		logger.error(
			`Maximum number of retries (${maxRetries}) exceeded. Exiting...`,
		);
		process.exit(1); // Exit process with failure if maximum retries exceeded
	}
}

export default connectDB;
