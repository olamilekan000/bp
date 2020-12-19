const createUserValidator = require('../config/Joi/createUser');

const validator = {
  validateUser: async (req, res, next) => {
    createUserValidator
      .validateAsync(req.body)
      .then(() => {
        next();
      })
      .catch((e) => {
        res
          .status(400)
          .json({
            error: e.message,
          })
          .end();
      });
  },
};

module.exports = validator;
