import { Schema, model } from 'mongoose';
import { createPaginator, getById } from '../util/schema';
import { ranks, DEFAULT_RANK } from './Player';

const uniqueType = {
  type: String,
  required: true,
  unique: true
};

const schema = new Schema({
  packageId: uniqueType,
  databaseId: uniqueType,
  displayName: {
    type: String,
    required: true
  },
  maintenance: {
    type: Boolean,
    default: false
  },
  released: {
    type: Boolean,
    default: false
  },
  requiredRank: {
    type: String,
    required: true,
    default: DEFAULT_RANK,
    enum: ranks
  }
});

schema.statics = {
  getById,
  list: createPaginator()
};

export default model('Game', schema);
