import { Request, Response } from 'express';
import { Content, ContentDocument } from '../models/contentModel';
import logger from '../../../config/logger';

// FETCH ALL DOCUMENTS
export const fetchAllDocuments = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// Find all documents with type "document"
		const allDocuments: ContentDocument[] = await Content.find({
			type: 'document',
		});
		if (allDocuments.length === 0) {
			logger.error('Documents not found');
			res.status(404).json({
				success: false,
				error: 'Documents not found',
			});
		}
		res.status(200).json({
			success: true,
			content: allDocuments,
		});
	} catch (error) {
		logger.error('Error getting all documents', error as Error);
		res.status(500).json({
			success: false,
			message: 'Failed to get documents',
		});
	}
};

// FETCH DOCUMENT BY ID
export const fetchFileByID = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { _id } = req.params;
		const document: ContentDocument | null = await Content.findById(_id);
		if (!document) {
			res.status(404).json({
				success: false,
				error: 'Document not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			content: document,
		});
	} catch (error) {
		logger.error('Error fetching document by ID: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};

// FETCH ALL IMAGES
export const fetchAllImages = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const allImages: ContentDocument[] = await Content.find({ type: 'image' });
		if (allImages.length === 0) {
			res.status(404).json({
				success: false,
				error: 'Images not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			content: allImages,
		});
	} catch (error) {
		logger.error('Error fetching images: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};

// FETCH IMAGE BY ID
export const fetchImageByID = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { _id } = req.params;
		const image: ContentDocument | null = await Content.findById(_id);
		if (!image) {
			res.status(404).json({
				success: false,
				error: 'Image not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			content: image,
		});
	} catch (error) {
		logger.error('Error fetching image: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};

// FETCH ALL VIDEOS
export const fetchAllVideos = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const allVideos: ContentDocument[] = await Content.find({ type: 'video' });
		if (allVideos.length === 0) {
			res.status(404).json({
				success: false,
				error: 'Videos not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			content: allVideos,
		});
	} catch (error) {
		logger.error('Error fetching videos: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};

// FETCH VIDEO BY ID
export const fetchVideoByID = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { _id } = req.params;
		const video: ContentDocument | null = await Content.findById(_id);
		if (!video) {
			res.status(404).json({
				success: false,
				error: 'Video not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			content: video,
		});
	} catch (error) {
		logger.error('Error fetching video: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};

// FETCH ALL AUDIOS
export const fetchAllAudios = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const allAudios: ContentDocument[] = await Content.find({ type: 'audio' });
		if (allAudios.length === 0) {
			res.status(404).json({
				success: false,
				error: 'Audios not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			content: allAudios,
		});
	} catch (error) {
		logger.error('Error fetching audios: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};

// FETCH VIDEO BY ID
export const fetchAudioByID = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { _id } = req.params;
		const audio: ContentDocument | null = await Content.findById(_id);
		if (!audio) {
			res.status(404).json({
				success: false,
				error: 'Audio not found',
			});
			return;
		}
		res.status(200).json({
			success: true,
			content: audio,
		});
	} catch (error) {
		logger.error('Error fetching audio: ', error as Error);
		res.status(500).json({
			success: false,
			error: 'Internal server error',
		});
	}
};
