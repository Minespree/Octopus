import { Router } from 'express';
import staffMiddleware from '../../middleware/staff';
import { Type, validateUuid } from '../../util/validate';

import { getSubpaginableMiddleware } from '../util/';
import { createProjection } from '../util/schema';

import Message from '../models/Message';

const router = Router();

// All routes are restricted
router.use(staffMiddleware);

router.get(
  '/public/:uuid',
  createTypeMiddleware(Message.listPublic, 'PRIVATE')
);

router.get(
  '/private/:uuid',
  createTypeMiddleware(Message.listPrivate, 'PUBLIC')
);

const createTypeMiddleware = (listFn, exclude) => {
  return getSubpaginableMiddleware({
    modelListFn: listFn,
    filterValidators: {
      uuid: validateUuid(true)
    },
    projection: createProjection(false, [exclude])
  });
};

export default router;
