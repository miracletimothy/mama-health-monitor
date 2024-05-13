import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';
import { OTP } from '../models/optModel';
import logger from '../../../config/logger';

// signup
export const signup = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { name, email, password, role, otp } = req.body;
		// Check if details are provided
		if (!name || !email || !password || !role || !otp) {
			res.status(403).json({
				success: false,
				message: 'All fields are required',
			});
		}
		// Find the most recent OTP from the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		if (response.length === 0 || otp !== response[0].otp) {
			return res.status(400).json({
				success: false,
				message: 'The OTP is not valid',
			});
		}
		// Secure Password
		let hashedPassword: string;
		try {
			hashedPassword = await bcrypt.hash(password, 10);
		} catch (error) {
			return res.status(500).json({
				success: false,
				message:
					`Hashing password error for ${password}: ` + (error as Error).message,
			});
		}
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});
		return res.status(201).json({
			success: true,
			message: 'User registered successfully',
			user: newUser,
		});
	} catch (error) {
		logger.error((error as Error).message);
		return res.status(500).json({
			success: false,
			error: (error as Error).message,
		});
	}
};

// signin
export const signin = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const jwt_secret = process.env.JWT_SECRET;
	if (!jwt_secret) {
		logger.error('JWT environment variable not defined');
		process.exit(1);
	}

	try {
		const { email, password } = req.body;
		// Check if email and password are provided
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Email and password are required',
			});
		}
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}
		// Verify password
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({
				success: false,
				message: 'Invalid password',
			});
		}
		// Generate JWT
		const token = jwt.sign({ userId: user._id }, jwt_secret, {
			expiresIn: '1h',
		});
		return res.status(200).json({
			success: true,
			message: 'Login successful',
			token,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		logger.error((error as Error).message);
		return res.status(500).json({
			success: false,
			error: (error as Error).message,
		});
	}
};

// signout
export const signout = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	// Implementation
	// HERE
	// Implementation
	return res.status(200).json({
		success: true,
		message: 'Signout successful',
	});
};
