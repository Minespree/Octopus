import { Router } from 'express';
import asyncWrap from '../../util/';
import staffMiddleware from '../../middleware/staff';

import { createUuidValidator } from '../../util/validate';
import Player from '../../models/Player';

const router = Router();

// Gets the (public) data of a player
router.get(
  '/:uuid',
  createUuidValidator(),
  asyncWrap(async (req, res) => {
    const { uuid } = req.params;
    const player = await Player.getById(uuid);

    res.json(player.getPublic());
  })
);

// TODO Add GET /players/status/:uuid

// Updates fields of a player (restricted)
router.post(
  '/:uuid',
  staffMiddleware,
  createUuidValidator({ allowUnknown: true }),
  asyncWrap(async (req, res) => {
    const { uuid } = req.params;
    const data = req.body;

    // Will throw RequestError if a validation error occurs
    await Player.update({ _id: uuid }, data, { runValidators: true });

    res.json({
      message: `Changed ${data.length} values`
    });
  })
);

export default router;
