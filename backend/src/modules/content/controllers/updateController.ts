import { Request, Response } from 'express';
import { Content } from '../models/contentModel';
import logger from '../../../config/logger';

export const updateController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { _id } = req.params;
		const { title, description, type, fileSize, filePath, fileUrl, uploader } =
			req.body;
		const updatedContent = await Content.findByIdAndUpdate(
			_id,
			{ title, description, fileUrl },
			{ new: true },
		);
		if (!updatedContent) {
			res.status(404).json({
				success: false,
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: 'Content updated successfully',
			content: updatedContent,
		});
	} catch (error) {
		logger.error('Error updating content: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Failed to update content',
		});
	}
};
