import { Request, Response } from 'express';
import otpGenerator from 'otp-generator';
import { OTP } from '../models/optModel';
import { User } from '../models/userModel';
import logger from '../../../src/config/logger';

export const sendOTP = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { email } = req.body;
		// Check if user already exists
		const checkUserExists = await User.findOne({ email });
		// If user found with provided email
		if (checkUserExists) {
			return res.status(401).json({
				success: false,
				message: 'User is already registered',
			});
		}
		let otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		let result = await OTP.findOne({ otp: otp });
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
			result = await OTP.findOne({ otp: otp });
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		return res.status(200).json({
			success: true,
			message: 'OTP sent successfully',
			otp,
		});
	} catch (error) {
		logger.error((error as Error).message);
		return res.status(500).json({
			success: false,
			error: (error as Error).message,
		});
	}
};
