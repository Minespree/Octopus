import httpStatus from 'http-status';
import BaseError from '../helpers/BaseError';

export default (err, req, res, next) => {
  if (err instanceof BaseError && err.public) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error'
    });
  }

  next(err);
};
