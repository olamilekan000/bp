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
      successData: user
    });
  }

  async getUsers(httpRequest) {
    const {
      queryParams: { limit, page }
    } = httpRequest;

    const { UserDataAccess } = this;

    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const parsedPage = page ? parseInt(page, 10) : 0;

    const users = await UserDataAccess.getUsers({
      page: parsedPage,
      limit: parsedLimit
    });

    return makeHttpSuccess(
      {
        statusCode: 200,
        successMessage: 'ok',
        successData: users[0].data
      },
      {
        total: users[0]?.total[0]?.total,
        limit: parsedLimit,
        page: parsedPage
      }
    );
  }

  async findUser(httpRequest) {
    const {
      params: { id }
    } = httpRequest;

    const { UserDataAccess } = this;

    const user = await UserDataAccess.findUserByParams({ _id: id });

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: user
    });
  }

  async updateUser(httpRequest) {
    const {
      params: { id },
      body
    } = httpRequest;

    const { UserDataAccess } = this;

    const user = await UserDataAccess.findUserAndUpdate(id, body);

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: user
    });
  }

  async deleteUser(httpRequest) {
    const {
      params: { id }
    } = httpRequest;

    const { UserDataAccess } = this;

    const deletedUser = await UserDataAccess.deleteUser(id);

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: deletedUser
    });
  }
}

module.exports = UserService;
