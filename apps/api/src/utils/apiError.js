class APIError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const createAPIError = (message, statusCode = 500, details = null) => {
  return new APIError(message, statusCode, details);
};

const sendAPIError = (res, error) => {
  return res.status(error.statusCode).json({
    error: {
      message: error.message,
      statusCode: error.statusCode,
      ...(error.details && { details: error.details })
    }
  });
};

const sendAPIErrorResponse = (res, message, statusCode = 500, details = null) => {
  return res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(details && { details })
    }
  });
};

module.exports = {
  APIError,
  createAPIError,
  sendAPIError,
  sendAPIErrorResponse
};