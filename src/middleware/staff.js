import httpStatus from 'http-status';
import RequestError from '../helpers/RequestError';
import APIUser from '../models/APIUser';

export default (req, res, next) => {
  const { user } = req;

  if (!user || !user.isStaff()) {
    throw new RequestError('Unauthorized', httpStatus.UNAUTHORIZED);
  }

  next();
};
