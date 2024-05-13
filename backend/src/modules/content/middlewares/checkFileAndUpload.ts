import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import logger from '../../../config/logger';
import dotenv from 'dotenv';
import { Content } from '../models/contentModel';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload file
export const uploadFile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const uploadResult = await cloudinary.uploader.upload(req.body.filePath);

		const content = new Content({
			title: req.body.title,
			description: req.body.description,
			type: req.body.fileType,
			fileSize: req.body.fileSize,
			filePath: req.body.filePath,
			fileUrl: uploadResult.secure_url,
			uploader: req.body.uploader,
		});
		const savedContent = await content.save();
		res.status(201).json(savedContent);
		next();
	} catch (error) {
		logger.error('Error uploading file: ', error as Error);
		return res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};
