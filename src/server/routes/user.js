const { container } = require('../../config/container');
const createUserValidator = require('../../config/Joi/createUser');
const validator = require('../../middlewares/validator');

const userRoutes = (Router) => {
  const router = Router();

  const UserController = container.resolve('UserController');

  router.route('/:id').delete(UserController.deleteUser);

  router.route('/:id').put(UserController.updateUser);

  router.route('/:id').get(UserController.findUser);

  router.route('/').get(UserController.getUsers);

  router
    .route('/')
    .post(validator(createUserValidator), UserController.createUser);

  return router;
};

module.exports = userRoutes;
