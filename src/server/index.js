const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const ErrorHandler = require('../helpers/error-handler');
const apiRouter = require('./routes');
const { setupContainer } = require('../config/container');

const server = () => {
  setupContainer();

  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan('dev'));

  app.use('/api/v1', apiRouter(express.Router));

  app.get('/', (_, res) => {
    res.status(200).json({
      data: {
        message: 'API is now live!!! 🚀🚀🚀'
      }
    });
  });

  app.use(ErrorHandler);

  return app;
};

module.exports = server;
