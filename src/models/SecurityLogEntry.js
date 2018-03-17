import { Schema, model } from 'mongoose';
import { validCodes } from '../lib/securityLog';
import { validateIp, createPaginator } from '../util/schema';

const schema = new Schema({
  actorId: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: validCodes
  },
  actionDetails: String,
  ipAddress: {
    type: String,
    required: true,
    validator: validateIp
  }
});

schema.statics = {
  list: createPaginator('createdAt', 50)
};

export default model('SecurityLogEntry', schema);
