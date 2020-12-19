const userModel = require('../../db/models/user');
const userServices = require('./user.services');
const UserRequestHandler = require('./user-request-handler');

const userDbInteractor = userServices({ Database: userModel });
const user = new UserRequestHandler({ userDbInteractor });

module.exports = user;
