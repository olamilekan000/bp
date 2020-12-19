const userControllers = require('../../modules/User/user.controllers');
const validator = require('../../middlewares/validator');

const userRoutes = (Router) => {
  const router = Router();

  router.route('/').post(validator.validateUser, userControllers.createUser);

  return router;
};

module.exports = userRoutes;
