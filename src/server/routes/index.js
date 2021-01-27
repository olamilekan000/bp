const userRoutes = require('./user');

const apiRouter = (Router) => {
  const router = Router();

  router.use('/users', userRoutes(Router));

  return router;
};

module.exports = apiRouter;
