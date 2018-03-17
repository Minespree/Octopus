import { Schema, model } from 'mongoose';
import { createPaginator, getById, MixedType } from '../util/schema';

const staffRanks = ['HELPER', 'MODERATOR', 'ADMIN'];

export const ranks = [
  'MEMBER',
  'IRON',
  'GOLD',
  'DIAMOND',
  'VIP',
  'YOUTUBE',
  ...staffRanks
];

export const DEFAULT_RANK = 'MEMBER';

const hideRanks = [...staffRanks, 'YOUTUBE', 'VIP'];

const publicFields = [
  'lastKnownName',
  'knownNames',
  '_id',
  'rank',
  'firstJoin',
  'coins',
  'gems',
  'level',
  'experience',
  'statistics',
  'achievements',
  'settings',
  'perks',
  'sets'
];

// We won't add players to this collection
// so no validation is required
const schema = new Schema(
  {
    lastKnownName: String,
    knownNames: [String],
    rank: {
      type: String,
      enum: ranks
    },
    firstJoin: Number,
    lastJoin: Number,
    coins: Number,
    gems: Number,
    level: Number,
    experience: Number,
    nickName: String,
    nickedRank: {
      type: String,
      enum: ranks
    },
    monthlyRank: Boolean,
    prefix: String,
    statistics: MixedType,
    achievements: MixedType,
    settings: MixedType,
    perks: MixedType,
    sets: MixedType
  },
  {
    collection: 'players'
  }
);

schema.method({
  getPublic() {
    const object = {};

    publicFields.forEach(field => {
      object[field] = this[field];
    });

    return object;
  },
  isStaff() {
    return staffRanks.includes(this.rank);
  }
});

schema.statics = {
  ranks,
  staffRanks,
  hideRanks,
  getById,
  list: createPaginator('firstJoin')
};

export default model('Player', schema);
