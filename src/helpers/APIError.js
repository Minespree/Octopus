import BaseError from './BaseError';
import httpStatus from 'http-status';

export default class APIError extends BaseError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, public = false) {
    super(message, status, public);
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Not found', public = true) {
    super(message, httpStatus.NOT_FOUND, public);
  }
}
