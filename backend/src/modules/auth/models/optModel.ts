import mongoose, { Schema, Document } from 'mongoose';
import mailSender from '../../../utilities/mailSender';
import logger from '../../../config/logger';

// Define interface for otp document
interface OtpDocument extends Document {
	email: string;
	otp: string;
	createdAt: Date;
}

const optSchema: Schema<OtpDocument> = new mongoose.Schema<OtpDocument>({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // Document will automatically be deleted in 5 minutes
	},
});

// Function to send emails
async function sendVerificationEmail(email: string, otp: string) {
	try {
		const mailResponse = await mailSender(
			email,
			'Verification Email',

			`<h1>Please confirm your OTP</h1>
            <p>OTP: ${otp}</p>`,
		);
		logger.info('Email sent successfully: ', mailResponse);
	} catch (error) {
		logger.error('Error occured when sending email: ', error);
		throw error;
	}
}

optSchema.pre<OtpDocument>('save', async function (next) {
	console.log('New Document saved to the database');
	// Only send email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

export const OTP = mongoose.model<OtpDocument>('OTP', optSchema);
