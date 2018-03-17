import { Router } from 'express';
const router = Router();

const createRouteHandler = (prefix, file) => {
  router.use(`/${prefix}`, file);
};

createRouteHandler('players', './players');
createRouteHandler('games', './games');
createRouteHandler('punishments', './punishments');
createRouteHandler('babel', './babel');

export default router;
