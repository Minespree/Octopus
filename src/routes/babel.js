import { Router } from 'express';
import RequestError from '../helpers/RequestError';
import staffMiddleware from '../../middleware/staff';
import validate, { Type } from '../../util/validate';

import asyncWrap, {
  getPaginableMiddleware,
  getSubpaginableMiddleware
} from '../util/';

import { createProjection } from '../util/schema';
import BabelLanguage, { isValidMessage } from '../models/BabelLanguage';

const router = Router();

// All routes are restricted
router.use(staffMiddleware);

// Gets all the languages
router.get(
  '/',
  getPaginableMiddleware({
    model: BabelLanguage,
    projection: createProjection(['_id'], ['messages'])
  })
);

// GET /:lang?page=1&perPage=30
// Gets [x, x + perPage] message entries of :lang
router.get(
  '/:lang',
  getSubpaginableMiddleware({
    modelListFn: BabelLanguage.listMessages,
    filterValidators: {
      lang: Type.string().required()
    }
  })
);

// Creates a new message
router.post(
  '/:lang',
  validate({
    lang: Type.string().required(),
    messageId: Type.string()
      .alphanum()
      .required(),
    message: Type.string(),
    messageArray: Type.array().min(1)
  }).xor('message', 'messageArray'),
  asyncWrap(async (req, res) => {
    const { lang } = req.params;
    const { messageId, message, messageArray } = req.body;

    const value = message ? message : messageArray;

    if (!isValidMessage(value)) {
      throw new RequestError('Invalid message');
    }

    await Language.update(
      { _id: lang },
      {
        [`messages.${messageId}`]: value
      }
    ).exec();

    res.json({
      [messageId]: value
    });
  })
);

export default router;
