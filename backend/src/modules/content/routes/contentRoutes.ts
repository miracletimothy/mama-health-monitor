import { Router } from 'express';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';
const router = Router();

// CMS ROUTES
router.post(
	'/v1/upload/document',
	uploadMiddleware /* contentController.uploadDocument */,
);
router.post(
	'/v1/upload/image',
	uploadMiddleware /* contentController.uploadImage */,
);
router.post(
	'/v1/upload/video',
	uploadMiddleware /* contentController.uploadVideo */,
);
router.post(
	'/v1/upload/audio',
	uploadMiddleware /* contentController.uploadAudio */,
);

router.get('/v1/fetch/document' /* contentController.fetchAllDocuments */);
router.get('/v1/fetch/document/:_id' /* contentController.fetchDocumentById */);
router.get('/v1/fetch/image' /* contentController.fetchAllImages */);
router.get('/v1/fetch/image/:_id' /* contentController.fetchImageById */);
router.get('/v1/fetch/video' /* contentController.fetchAllVideos */);
router.get('/v1/fetch/video/:_id' /* contentController.fetchVideoById */);
router.get('/v1/fetch/audio' /* contentController.fetchAllAudios */);
router.get('/v1/fetch/audio/:_id' /* contentController.fetchAudioById */);

router.put('/v1/update/document/:_id' /* contentController.updateDocument */);
router.put('/v1/update/image/:_id' /* contentController.updateImage */);
router.put('/v1/update/video/:_id' /* contentController.updateVideo */);
router.put('/v1/update/audio/:_id' /* contentController.updateAudio */);

router.delete(
	'/v1/delete/document/:_id' /* contentController.deleteDocument */,
);
router.delete('/v1/delete/image/:_id' /* contentController.deleteImage */);
router.delete('/v1/delete/video/:_id' /* contentController.deleteVideo */);
router.delete('/v1/delete/audio/:_id' /* contentController.deleteAudio */);

export default router;
