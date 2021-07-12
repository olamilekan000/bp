const { container } = require('../../config/container');
const validator = require('../../middlewares/validator');

const authRoutes = (Router) => {
  const router = Router();

  const AuthController = container.resolve('AuthController');

  router.route('/create').post(AuthController.createUser);

  router.route('/login').post(AuthController.login);

  router.route('/change-password/:id').post(AuthController.changePassword);

  router.route('/forgot-password').post(AuthController.forgotPassword);

  router.route('/reset-password').post(AuthController.resetPassword);

  return router;
};

module.exports = authRoutes;
