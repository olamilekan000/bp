const wordSearcher = require('.');
const adaptRequest = require('../../helpers/adapt-request');

const WordSearchControllers = {
  searchWord: (req, res) => {
    const httpRequest = adaptRequest(req);

    wordSearcher
      .search(httpRequest)
      .then(({ headers, statusCode, data }) => {
        res.set(headers).status(statusCode).send(data);
      })
      .catch((e) => res
        .status(500)
        .json({
          error: e.message || 'Internal server error',
        })
        .end());
  },
};

module.exports = WordSearchControllers;
