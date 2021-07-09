const environmentConfig = () => {
  let envConfig = {};

  switch (process.env.NODE_ENV) {
    case 'staging':
      break;

    default:
      envConfig = {
        mongoBD: process.env.MONGODB_URL_DEV,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET
      };
      break;
  }

  return envConfig;
};

module.exports = environmentConfig;
