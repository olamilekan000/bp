const adaptRequest = (req = {}) =>
  Object.freeze({
    path: req.path,
    method: req.method,
    params: req.params,
    queryParams: req.query,
    body: req.body
  });

module.exports = adaptRequest;
