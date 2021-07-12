const makeHttpError = ({ statusCode, errorMessage }) => ({
  headers: {
    'Content-Type': 'application/json'
  },
  statusCode,
  data: JSON.stringify({
    error: errorMessage
  })
});

module.exports = makeHttpError;
