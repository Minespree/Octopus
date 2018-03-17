import { Router } from 'express';
import Game from '../../models/Game';

import { getPaginableMiddleware } from '../util/';
import { PUBLIC_PROJECTION } from '../util/schema';

const router = Router();

// GET /games/?page=1&perPage=30
router.get(
  '/',
  getPaginableMiddleware({
    model: Game,
    projection: PUBLIC_PROJECTION
  })
);

export default router;
