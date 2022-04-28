const mongoose = require('mongoose');
const { mongoBD } = require('../../config/environment')();
const logger = require('../../config/winston');

const boostrapMongoose = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoBD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    mongoose.connection.once('open', () => {
      logger.log('info', 'Now connected to the database');
      resolve(mongoose);
    });
    mongoose.connection.on('error', () => {
      logger.log('info', "Couldn't connect to the mongodb server");
      reject();
    });
  });

module.exports = boostrapMongoose;
