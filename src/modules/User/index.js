const UserModel = require('../../db/models/user');
const userServices = require('./user.services');
const UserRequestHandler = require('./user-request-handler');

const userDbInteractor = userServices({ Database: UserModel });
const user = new UserRequestHandler({ userDbInteractor });

module.exports = user;
