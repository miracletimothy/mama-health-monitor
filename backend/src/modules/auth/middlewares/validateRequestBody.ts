import { Request, Response, NextFunction } from 'express';

export const validateSendOtpRequestBody = (
	req: Request,
	res: Response,
	next: NextFunction,
): Response | void => {
	// Check if request body only contains email field
	if (Object.keys(req.body).length !== 1 || !req.body.email) {
		return res.status(400).json({
			success: false,
			message: 'Bad Request',
		});
	}
	next();
};

export const validateSignUpRequestBody = (
	req: Request,
	res: Response,
	next: NextFunction,
): Response | void => {
	// Check if request body only contains [name, email, password, role, otp]
	if (
		Object.keys(req.body).length !== 5 ||
		!req.body.name ||
		!req.body.email ||
		!req.body.password ||
		!req.body.role ||
		!req.body.otp
	) {
		return res.status(400).json({
			success: false,
			message: 'Bad Request',
		});
	}
	next();
};

export const validateSignInRequestBody = (
	req: Request,
	res: Response,
	next: NextFunction,
): Response | void => {
	// Check if request body only has email and password
	if (
		Object.keys(req.body).length !== 2 ||
		!req.body.email ||
		!req.body.password
	) {
		return res.status(400).json({
			success: false,
			message: 'Bad Request',
		});
	}
	next();
};
