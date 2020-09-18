const userControllers = require("../../modules/User/user.controllers");

const userRoutes = (Router) => {
  const router = Router();

  router.route("/").get(userControllers.createUser);

  return router;
};

module.exports = userRoutes;
