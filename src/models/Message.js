import { Schema, model } from 'mongoose';
import { getById, createSubArrayPaginator } from '../util/schema';

const messageObjectType = {
  message: String,
  timestamp: Date,
  server: String,
  rawText: String,
  target: String
};

const messageLimit = 50;

const schema = new Schema(
  {
    PUBLIC: [messageObjectType],
    PRIVATE: [messageObjectType]
  },
  {
    collection: 'messages'
  }
);

schema.statics = {
  getById,
  listPublic: createSubArrayPaginator('PUBLIC', messageLimit),
  listPrivate: createSubArrayPaginator('PRIVATE', messageLimit)
};

export default model('Message', schema);
