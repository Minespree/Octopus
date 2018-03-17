import httpStatus from 'http-status';
import { asyncWrap } from '../util';
import RequestError from '../helpers/RequestError';
import APIUser from '../models/APIUser';

export default asyncWrap(async (req, res, next) => {
  const apiKey = req.get('X-Minespree-Secret');

  if (apiKey) {
    const user = await APIUser.getByKey(apiKey);

    if (user) {
      req.user = user;
      return next();
    }
  }

  throw new RequestError('Bad credentials', httpStatus.UNAUTHORIZED);
});
