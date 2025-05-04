import winston from 'winston';
import fs from 'fs';
import path from 'path';
import config from '../config'

const { logDir, isDev } = config;

// Ensure log directory exists //read about it later
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Define log formats
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.splat(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        const msg = typeof message === 'object' ? JSON.stringify(message) : message;
        return stack
            ? `[${timestamp}] ${level}: ${msg}\n${stack}`
            : `[${timestamp}] ${level}: ${msg}`;
    })
);

// Create Winston logger instance
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'all.log')
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'errors.log'),
            level: 'error'
        }),
    ],
    exceptionHandlers: [ //without it an error with exception will not be logged
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ]
});

if (isDev) {
    logger.add(new winston.transports.Console({
        format: consoleFormat
    }));
    logger.level = 'debug';
}

export default logger;