/* eslint-disable brace-style */
const adaptRequest = require('../../helpers/adapt-request');
const logger = require('../../config/winston');

class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;

    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.findUser = this.findUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async createUser(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } = await this.UserService.createUser(
        httpRequest
      );

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } = await this.UserService.getUsers(
        httpRequest
      );

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async findUser(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } = await this.UserService.findUser(
        httpRequest
      );

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } = await this.UserService.updateUser(
        httpRequest
      );

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } = await this.UserService.deleteUser(
        httpRequest
      );

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }
}

module.exports = UserController;
