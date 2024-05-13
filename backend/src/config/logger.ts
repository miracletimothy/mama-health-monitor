import { createLogger, transports, format } from 'winston';
import path from 'path';

const logger = createLogger({
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple(),
				format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				format.printf(
					({ timestamp, level, message }) =>
						`${timestamp} ${level}: ${message}`,
				),
			),
		}),
		new transports.File({
			filename: path.join(__dirname, 'logs', 'error.log'),
			level: 'error',
			format: format.combine(format.timestamp(), format.json()),
		}),
	],
});

export default logger;
