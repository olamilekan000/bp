/* eslint-disable brace-style */
/* eslint-disable no-useless-catch */
require('dotenv').config();

const environmentConfig = require('./src/config/environment');
const logger = require('./src/config/winston');
const boostrapMongoose = require('./src/database/mongodb');
const server = require('./src/server');

(async () => {
  try {
    await boostrapMongoose();
    const app = server();
    const { port } = environmentConfig();
    app.listen(port, () =>
      logger.log('info', `app now listening on ${port} 🚀🚀🚀`)
    );
  } catch (e) {
    throw e;
  }
})();
