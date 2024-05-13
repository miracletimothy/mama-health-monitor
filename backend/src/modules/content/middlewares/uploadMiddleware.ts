import { Request, Response, NextFunction } from 'express';
import logger from '../../../config/logger';

export const uploadMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		logger.info('uploadMiddleware');
	} catch (error) {
		logger.error('uploadMiddleware', error as Error);
	}
};
