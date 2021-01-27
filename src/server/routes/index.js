const userRoutes = require('./user');
const wordSearchRoute = require('./word-searcher');

const apiRouter = (Router) => {
  const router = Router();

  router.use('/users', userRoutes(Router));
  router.use('/search', wordSearchRoute(Router));

  return router;
};

module.exports = apiRouter;
