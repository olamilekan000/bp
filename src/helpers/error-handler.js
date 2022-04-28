const logger = require('../config/winston');

// eslint-disable-next-line no-unused-vars
const ErrorHandler = (error, _, res, __) => {
  // render the error page
  logger.log({
    level: 'error',
    message: error?.data?.error ?? error?.data?.message ?? error.message
  });

  const code = error.code || error.status || 500;

  res.status(code).json({
    success: false,
    statusCode: code,
    data: {
      error: error?.data?.error ?? error?.data?.message ?? error.message
    }
  });
};

module.exports = ErrorHandler;
