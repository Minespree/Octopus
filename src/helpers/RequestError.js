import BaseError from './BaseError';
import httpStatus from 'http-status';

export default class APIError extends BaseError {
  constructor(message, status = httpStatus.BAD_REQUEST, public = true) {
    super(message, status, public);
  }
}
