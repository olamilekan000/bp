require('dotenv').config();

const environmentConfig = require('./src/config/environment');
const logger = require('./src/config/winston');
const mongodbServer = require('./src/database/mongodb');
const appServer = require('./src/server');

const bootstrap = async () => {
  const mongoose = await mongodbServer();
  const app = appServer();
  const { port } = environmentConfig();
  const server = app.listen(port, () =>
    logger.log('info', `app now listening on ${port} 🚀🚀🚀`)
  );

  return {
    mongoose,
    server
  };
};

module.exports = {
  bootstrap
};
