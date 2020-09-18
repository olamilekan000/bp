const makeHttpError = ({ statusCode, errorMessage }) => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode,
    data: JSON.stringify({
      error: errorMessage,
    }),
  };
};

module.exports = makeHttpError;
