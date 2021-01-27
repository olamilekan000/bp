
const path = require('path')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const ErrorHandler = require('../helpers/error-handler');
const apiRouter = require('./routes');

const server = () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));


  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname, 'views')))
  app.use('/api/v1', apiRouter(express.Router));

  // app.get('/', (_, res) => {
  //   res.status(200).json({
  //     data: {
  //       message: 'API is now live!!! 🚀🚀🚀',
  //     },
  //   });
  // });

  app.get('/', function(req, res) {
    res.render('index');
  });


  app.use(ErrorHandler);

  return app;
};

module.exports = server;
