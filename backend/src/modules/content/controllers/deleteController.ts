import { Request, Response } from 'express';
import { Content } from '../models/contentModel';
import logger from '../../../config/logger';

export const deleteController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { _id } = req.params;
		const deletedContent = await Content.findByIdAndDelete(_id);
		if (!deletedContent) {
			res.status(404).json({
				success: false,
				error: 'Content not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: 'Content deleted successfully',
		});
	} catch (error) {
		logger.error('Error deleting content: ', error as Error);
		res.status(500).json({
			success: true,
			error: 'Failed to delete content',
		});
	}
};
