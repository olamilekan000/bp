/* eslint-disable brace-style */
/* eslint-disable no-useless-catch */
const { bootstrap } = require('./boostap');
const logger = require('./src/config/winston');

(async () => {
  try {
    const { server, mongoose } = await bootstrap();

    process.on('SIGTERM', async () => {
      logger.log('info', 'SIGTERM received: Gracefully sutting down');
      server.close();
      await mongoose.disconnect();
      process.exit(0);
    });
    process.on('SIGINT', async () => {
      logger.log('info', 'SIGINT received: Gracefully sutting down');
      server.close();
      await mongoose.disconnect();
      process.exit(0);
    });
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
})();
