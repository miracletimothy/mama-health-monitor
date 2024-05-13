import { Request, Response } from 'express';
import { Content } from '../models/contentModel';
import logger from '../../../config/logger';

// CHECK THIS
export const uploadFile = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { title } = req.body;
		const content = await Content.findOne({ title });
		res.status(200).json({
			success: true,
			message: 'Content Found Saved',
			content: content,
		});
	} catch (error) {
		logger.error('File not found', error as Error);
		res.status(404).json({
			success: false,
			error: 'Content not found',
		});
	}
};
