import mongoose from 'mongoose';
import logger from '../util/logger';
import { mongoUri } from '../config';

// Replace plugin native promise in mongoose
mongoose.Promise = global.Promise;

export default async () => {
  try {
    await mongoose.connect(mongoUri);
  } catch (err) {
    logger.error(`MongoDB connection error: ${err}`);
  }
};
