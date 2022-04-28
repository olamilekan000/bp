const environmentConfig = () => {
  let envConfig = {};

  switch (process.env.NODE_ENV) {
    case 'staging':
      break;

    default:
      envConfig = {
        mongoBD: process.env.MONGODB_URL,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
        microservice: {
          urls: {},
          timeout: +(process.env.MICROSERVICE_TIMEOUT || 10000)
        }
      };
      break;
  }

  return envConfig;
};

module.exports = environmentConfig;
