export default class BaseError extends Error {
  /**
   * @param {*} message - The error message
   * @param {*} status - HTTP status code of error
   * @param {*} public - Whether the message should be visible to the user or not
   */
  constructor(message, status, public) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.public = public;
    // Bluebird doesn't append this anymore
    this.isOperational = true;
    Error.captureStackTrace(this, this.name);
  }
}