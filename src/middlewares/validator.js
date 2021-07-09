const validator = (validationSchema) => (req, res, next) => {
  validationSchema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((e) => {
      res
        .status(400)
        .json({
          error: e.message
        })
        .end();
    });
};

module.exports = validator;
