const authRoutes = require('./auth');
const userRoutes = require('./user');

const apiRouter = (Router) => {
  const router = Router();

  router.use('/auth', authRoutes(Router));
  router.use('/users', userRoutes(Router));

  return router;
};

module.exports = apiRouter;
