import { Schema, model } from 'mongoose';
import {
  createPaginator,
  createSubArrayPaginator,
  getById,
  MixedType
} from '../util/schema';

// Checks if a message is valid (String or array of Strings)
export const isValidMessage = message => {
  return (
    typeof message === 'string' ||
    (Array.isArray(message) &&
      message.reduce((prev, cur) => {
        return typeof cur === 'string' && prev;
      }, true))
  );
};

const schema = new Schema(
  {
    messages: {
      // Can be strings or array of strings
      type: [MixedType],
      required: true
      // Validation here is too costly
    }
  },
  {
    collection: 'babel'
  }
);

schema.statics = {
  getById,
  list: createPaginator(),
  listMessages: createSubArrayPaginator('messages')
};

export default model('BabelLanguage', schema);
