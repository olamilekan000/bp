const logger = require('../config/winston');

const ErrorHandler = (error, _, res, __) => {
  // render the error page
  logger.log({ level: 'error', message: error.message });

  res.status(error.status || 500);
  res.json({ error: error.message });
};

module.exports = ErrorHandler;
