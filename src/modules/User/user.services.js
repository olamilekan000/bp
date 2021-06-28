const makeHttpSuccess = require('../../helpers/http-success');

class UserService {
  constructor({ UserDataAccess }) {
    this.UserDataAccess = UserDataAccess;
  }

  async createUser(httpRequest) {
    const { body } = httpRequest;

    const { UserDataAccess } = this;

    const user = await UserDataAccess.createUser(body);

    return makeHttpSuccess({
      statusCode: 201,
      successMessage: 'ok',
      successData: user,
    });
  }

  async getUsers(httpRequest) {
    const { params } = httpRequest;

    const { UserDataAccess } = this;

    const users = await UserDataAccess.getUsers(params);

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: users,
    });
  }

  async findUser(httpRequest) {
    const { params: { id } } = httpRequest;

    const { UserDataAccess } = this;

    const user = await UserDataAccess.findUserByParams({ _id: id });

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: user,
    });
  }

  async updateUser(httpRequest) {
    const { params: { id }, body } = httpRequest;

    const { UserDataAccess } = this;

    const user = await UserDataAccess.findUserAndUpdate(id, body);

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: user,
    });
  }

  async deleteUser(httpRequest) {
    const { params: { id } } = httpRequest;

    const { UserDataAccess } = this;

    const user = await UserDataAccess.deleteUser(id);

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: user,
    });
  }
}

module.exports = UserService;
