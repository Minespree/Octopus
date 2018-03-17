import winston from 'winston';
import morgan from 'morgan';

import { logging } from '../config';
const { logLevel, attachConsole, outputFile } = logging;

const logger = winston.createLogger({
  level,
  format: winston.format.json(),
  transports: generateTransports()
});

const generateTransports = () => {
  return [
    outputFile
      ? new winston.transports.File({
          filename: outputFile
        })
      : false
  ].filter(Boolean);
};

const addConsole = () => {
  if (!attachConsole) {
    return;
  }

  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
};

addConsole();

// Passes the logging stream of morgan (used to log Express requests)
// to the main winston logger
export const createMorganLogger = () => {
  return morgan({
    stream: logger.stream
  });
};

export default logger;
