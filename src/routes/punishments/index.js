import { Router } from 'express';
import RequestError from '../../helpers/RequestError';
import asyncWrap, { getPaginableMiddleware } from '../../util/';
import staffMiddleware from '../../middleware/staff';

import validate, { Type, validateUuid } from '../../util/validate';
import { createProjection } from '../../util/schema';

import Punishment from '../../models/Punishment';

const codeLength = Punishment.codeLength;
const router = Router();

// All routes are restricted
router.use(staffMiddleware);

// Gets all the punishments that match the filters
router.get(
  '/',
  getPaginableMiddleware({
    model: Punishment,
    filterValidators: {
      target: validateUuid(false),
      source: validateUuid(false),
      appealCode: Type.string().length(codeLength),
      punishmentId: Type.string().length(codeLength),
      types: Type.array().items(Type.string().allow(Punishment.types))
    },
    // Only return a subset of the keys
    projection: createProjection([
      'target',
      'source',
      'type',
      'until',
      'timestamp',
      'undone',
      'punishmentId'
    ])
  })
);

// Gets data about a punishment entry
router.get(
  '/:id',
  validate({
    id: Type.objectId().required()
  }),
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    const punishment = await Punishment.getById(id, true);

    res.json(punishment);
  })
);

// Creates a new punishment
router.post(
  '/',
  validate({
    target: validateUuid(),
    source: validateUuid(),
    type: Type.string()
      .required()
      .allow(Punishment.types),
    until: Type.date()
      .min('now')
      // 'until' is only required for temporary punishments
      .when('type', {
        is: Type.string().allow(Punishment.temporaryTypes),
        then: Type.required()
      }),
    reason: Type.string(),
    notes: Type.array().single()
  }),
  asyncWrap(async (req, res) => {
    const punishment = new Punishment(req.body);

    // Will perform additional validations
    await punishment.save();

    // TODO Send punishment through Redis for automatic kick

    // Send the new object with the appealCode and punishmentId back
    res.json(punishment.toObject());
  })
);

// Sets a punishment entry as expired. Will complain if punishment isn't temporary
router.delete(
  '/:id',
  validate({
    id: Type.objectId().required()
  }),
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    const punishment = await Punishment.getById(id);
    const { type } = punishment;

    if (!Punishment.appealableTypes.includes(type)) {
      throw new RequestError(`Punishment isn't appealable, has type ${type}`);
    }

    punishment.undone = true;
    await punishment.save();

    res.json(punishment.toObject());
  })
);

export default router;
