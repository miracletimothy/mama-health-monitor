import nodemailer from 'nodemailer';
import logger from '../config/logger';

const mailSender = async (email: string, title: string, body: string) => {
	try {
		// Create Mail Transporter
		let transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT), // Ensure port is parsed as a number
			secure: false,
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD,
			},
		});

		// Send emails to users
		let info = await transporter.sendMail({
			from: 'CMHMCS <support@tesseractlabs.biz>',
			to: email,
			subject: title,
			html: body,
		});
		logger.info('Email info: ', info);
		return info;
	} catch (error) {
		logger.error((error as Error).message);
	}
};

export default mailSender;
