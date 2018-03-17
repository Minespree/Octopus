import httpStatus from 'http-status';
import { Schema } from 'mongoose';
import { NotFoundError } from '../helpers/APIError';

const { Types } = Schema;

export const IP_REGEX = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const UUID_REGEX = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;

export const validateIp = value => {
  return IP_REGEX.test(value);
};

export const validateUuid = value => {
  return UUID_REGEX.test(value);
};

export const createPaginator = (sortField, pageLimit = 30, lean = true) => {
  return function({ page = 1, perPage = pageLimit, filter, projection }) {
    let query = this.find(filter, projection, { lean });

    if (sortField) {
      query = query.sort({ [sortField]: -1 });
    }

    return query
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  };
};

/**
 * Creates a paginator based on a subarray field on a document.
 * Uses findOne so only one document will be returned.
 * @param {*} arrayField The field which contains the array to paginate.
 * @param {*} pageLimit
 */
export const createSubArrayPaginator = (
  arrayField,
  pageLimit = 30,
  lean = true
) => {
  return function({ page = 1, perPage = pageLimit, filter, projection }) {
    const start = perPage * (page - 1);

    return this.findOne(
      filter,
      {
        ...projection,
        [arrayField]: {
          $slice: [start, start + perPage]
        }
      },
      { lean }
    ).exec();
  };
};

/**
 * Filters the values returned by a mongoose find query.
 * @param {[String]} includeFields The fields to be included
 * @param {[String]} excludeFields The fields to be excluded. Will override the includeFields if duplicate.
 */
export const createProjection = (includeFields, excludeFields) => {
  const obj = {};

  if (fields) {
    fields.forEach(field => (obj[field] = 1));
  }

  if (excludeFields) {
    excludeFields.forEach(excludedField => (obj[excludedField] = 0));
  }

  return obj;
};

// Public routes shouldn't send _id private values
export const PUBLIC_PROJECTION = createProjection(false, ['_id']);

/**
 * Allows to have constant defined .lean() queries
 */
export async function optionalLean(query, lean) {
  if (lean) {
    return query.lean();
  }

  return query;
}

export async function getById(id, lean, projection) {
  try {
    let document;

    if (Types.ObjectId.isValid(id)) {
      document = await optionalLean(this.findById(id, projection), lean).exex();
    }

    if (document) {
      return document;
    }

    throw new NotFoundError();
  } catch (error) {
    // TODO Fix
    throw error;
  }
}

export const getByField = (field, lean) => {
  return async function(value) {
    try {
      const document = await optionalLean(
        this.findOne({ [field]: value }),
        lean
      ).exec();

      if (document) {
        return document;
      }

      throw new NotFoundError();
    } catch (error) {
      // TODO Fix?
      throw error;
    }
  };
};

export const MixedType = Types.Mixed;
