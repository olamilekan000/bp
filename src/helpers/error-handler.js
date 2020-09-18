const ErrorHandler = (err, _, res, __) => {
  // render the error page

  res.status(err.status || 500);
  res.json({ error: err.message });
};

module.exports = ErrorHandler;
