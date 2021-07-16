/* eslint-disable brace-style */
const adaptRequest = require('../../helpers/adapt-request');
const logger = require('../../config/winston');

class AuthController {
  constructor({ AuthService }) {
    this.AuthService = AuthService;

    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async createUser(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } = await this.AuthService.createUser(
        httpRequest
      );

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } = await this.AuthService.login(
        httpRequest
      );

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } =
        await this.AuthService.changePassword(httpRequest);

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } =
        await this.AuthService.forgotPassword(httpRequest);

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const httpRequest = adaptRequest(req);

      const { headers, statusCode, data } =
        await this.AuthService.resetPassword(httpRequest);

      res.set(headers).status(statusCode).send(data);
    } catch (error) {
      logger.log({ level: 'error', message: error.message });
      next(error);
    }
  }
}

module.exports = AuthController;
