const adaptRequest = require("../../common/adapt-request");
const user = require(".");

const userControllers = {
  createUser: (req, res) => {
    const httpRequest = adaptRequest(req);

    user
      .createUser(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res.set(headers).status(statusCode).send(data);
      })
      .catch((e) =>
        res
          .status(500)
          .json({
            error: "Internal server error",
          })
          .end()
      );
  },
};

module.exports = userControllers;
