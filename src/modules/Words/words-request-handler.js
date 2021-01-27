const makeHttpSuccess = require('../../helpers/http-success');

class WordSearchRequestHandler {
  constructor({ fileReader }) {
    this.fileReader = fileReader;
  }

  async search(httpRequest) {
    const { queryParams: { q } } = httpRequest;

    const words = await this.fileReader('shakespare.txt', q);

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: words,
    });
  }
}

module.exports = WordSearchRequestHandler;
