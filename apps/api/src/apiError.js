function sendApiError(res, status, message) {
  return res.status(status).json({
    error: {
      message,
    },
  });
}

module.exports = {
  sendApiError,
};
