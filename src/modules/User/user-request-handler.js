const makeHttpSuccess = require("../../common/http-success");

class UserRequestHandler {
  constructor({ userDbInteractor }) {
    this.userDbInteractor = userDbInteractor;
  }

  async createUser(httpRequest) {
    const { body } = httpRequest;

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: "ok",
      successData: "response",
    });
  }
}

module.exports = UserRequestHandler;
