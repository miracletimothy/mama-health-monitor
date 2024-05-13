import { Router } from 'express';
import { sendOTP } from '../controllers/otpController';
import { signup, signin, signout } from '../controllers/authController';
import {
	validateSendOtpRequestBody,
	validateSignUpRequestBody,
	validateSignInRequestBody,
} from '../middlewares/validateRequestBody';

const router = Router();

// AUTH ROUTES
router.post('/v1/signup', validateSignUpRequestBody, signup);
router.post('/v1/send-otp', validateSendOtpRequestBody, sendOTP);
router.post('/v1/signin', validateSignInRequestBody, signin);
router.post('/v1/signout', signout);

export default router;
