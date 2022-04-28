const adaptRequest = (req = {}) =>
  Object.freeze({
    path: req.path,
    method: req.method,
    params: req.params,
    queryParams: req.query,
    body: req.body
  });

const makeHttpError = (
  { statusCode, errorMessage, errorData = {} },
  params = {}
) => ({
  headers: {
    'Content-Type': 'application/json'
  },
  statusCode,
  data: JSON.stringify({
    message: errorMessage,
    success: false,
    data: errorData,
    ...params
  })
});

const makeHttpSuccess = (
  { statusCode, successMessage, successData = {} },
  params = {}
) => ({
  headers: {
    'Content-Type': 'application/json'
  },
  statusCode,
  data: JSON.stringify({
    success: true,
    message: successMessage,
    data: successData,
    ...params
  })
});

module.exports = { adaptRequest, makeHttpError, makeHttpSuccess };
