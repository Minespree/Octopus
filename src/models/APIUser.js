import { Schema, model, Types } from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import { createPaginator, getByField, validateUuid } from '../util/schema';

const roles = ['user', 'staff', 'developer'];

const schema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    validate: validateUuid
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  twoFactorToken: String
});

schema.method({
  hasTwoFactor() {
    return new Boolean(this.twoFactorToken);
  },
  isStaff() {
    return this.role !== 'user';
  }
});

schema.statics = {
  roles,
  getByKey: getByField('apiKey'),
  list: createPaginator('createdAt', 50)
};

export default model('APIUser', schema);
