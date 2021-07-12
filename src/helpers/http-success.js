const makeHttpSuccess = (
  { statusCode, successMessage, successData = {} },
  params = {}
) => ({
  headers: {
    'Content-Type': 'application/json'
  },
  statusCode,
  data: JSON.stringify({
    success: successMessage,
    data: successData,
    ...params
  })
});

module.exports = makeHttpSuccess;
