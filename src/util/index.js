import validate, { Type } from './validate';

const possibleChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const getRandomId = (size = 6) => {
  let id = '';

  for (let i = 0; i < size; i++) {
    id += possibleChars.charAt(getRandomInteger(0, possibleChars.length));
  }

  return id;
};

export const getRandomInteger = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const asyncWrap = fn => {
  (req, res, next, ...args) => {
    fn(req, res, next, ...args).catch(next);
  };
};

const getPaginableValidators = defaultPerPage => {
  return {
    page: Type.number()
      .min(1)
      .integer()
      .default(1),
    perPage: Type.number()
      .min(1)
      .max(100)
      .integer()
      .default(defaultPerPage)
  };
};

/**
 * Creates a middleware array that can be used on a Express route.
 * @param {Model} Mongoose model to find. Must have a paginator `list` method. @see schema.createPaginator()
 * @param {Object} filterValidators Object that contains key->Type filters.
 * @param {[String]} projection {@see schema.createProjection()}
 * @param {Number} defaultPerPage Default number of entries returned per page.
 */
export const getPaginableMiddleware = ({
  model,
  filterValidators,
  projection,
  defaultPerPage = 30
}) => {
  if (!model || !model.list) {
    throw new Error("Model isn't paginable");
  }

  return [
    validate({
      ...getPaginableValidators(defaultPerPage),
      ...filterValidators
    }),
    asyncWrap(async (req, res) => {
      const { page, perPage, ...filter } = req.body;
      const result = await model.list(
        {
          page,
          perPage,
          filter,
          projection
        },
        // Pass lean to get raw JS objects
        true
      );

      res.json(result);
    })
  ];
};

/**
 * Creates a middleware array that can be used on a Express route.
 * @param {Function} modelListFn SubArrayPaginator model function {@see schema.createSubArrayPaginator()}
 * @param {Object} filterValidators Object that contains key->Type filters.
 * @param {[String]} projection {@see schema.createProjection()}
 * @param {Number} defaultPerPage Default number of entries returned per page.
 */
export const getSubpaginableMiddleware = ({
  modelListFn,
  defaultPerPage = 30,
  projection,
  filterValidators
}) => {
  if (!modelListFn) {
    throw new Error("Model doesn't have subpaginator");
  }

  return [
    validate({
      ...getPaginableValidators(defaultPerPage),
      ...filterValidators
    }),
    asyncWrap(async (req, res) => {
      const { page, perPage, ...filter } = req.body;
      const result = await modelListFn(
        {
          page,
          perPage,
          filter,
          projection
        },
        // Pass lean to get raw JS objects
        true
      );

      res.json(result);
    })
  ];
};
