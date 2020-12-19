const makeHttpSuccess = ({ statusCode, successMessage, successData = {} }) => ({
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode,
  data: JSON.stringify({
    success: successMessage,
    data: successData,
  }),
});

module.exports = makeHttpSuccess;
