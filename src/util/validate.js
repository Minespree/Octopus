import httpStatus from 'http-status';
import { celebrate, Joi } from 'celebrate';
import { UUID_REGEX } from './schema';
import RequestError from '../helpers/RequestError';

export default (validate = celebrate);

export const UUID_TYPE = Type.string()
  .required()
  .regex(UUID_REGEX);

export const validateUuid = (required = true) => {
  const type = Type.string().regex(UUID_REGEX);

  if (required) {
    return type.required();
  }

  return type;
};

export const createUuidValidator = ({
  required = true,
  allowUnknown = false,
  key = 'uuid'
}) => {
  const rule = validateUuid(required);

  return validate(
    {
      [key]: rule
    },
    { allowUnknown }
  );
};

// Add ObjectID validator to Joi
const addObjectIdValidator = () => {
  Joi.objectId = () => {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/);
  };
};

addObjectIdValidator();

export const Type = Joi;
