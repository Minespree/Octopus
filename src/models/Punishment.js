import { Schema, model } from 'mongoose';
import { createPaginator, getById } from '../util/schema';
import { getRandomId } from '../util';

const temporaryTypes = ['TEMP_BAN', 'TEMP_MUTE'];
const appealableTypes = ['BAN', 'MUTE', ...temporaryTypes];

const types = ['KICK', ...appealableTypes];
const codeLength = 6;

const schema = new Schema(
  {
    // TODO Validate UUIDs
    target: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: types
    },
    until: {
      type: Date,
      required() {
        return temporaryTypes.includes(this.type);
      }
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now
    },
    reason: String,
    undone: {
      type: Boolean,
      default: false
    },
    appealCode: {
      type: String,
      required() {
        return appealableTypes.includes(this.type);
      },
      default: getRandomId.bind(undefined, codeLength)
    },
    punishmentId: {
      type: String,
      required: true,
      default: getRandomId.bind(undefined, codeLength)
    },
    notes: [String],
    score: {
      type: Number,
      default: 1
    }
  },
  {
    collection: 'punishments'
  }
);

schema.method({
  isTemporary() {
    return temporaryTypes.includes(this.type);
  }
});

schema.statics = {
  temporaryTypes,
  appealableTypes,
  types,
  codeLength,
  getById,
  list: createPaginator('timestamp')
};

export default model('Punishment', schema);
