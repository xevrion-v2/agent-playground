export const errorResponse = (message: string, code = "bad_request") => ({
  error: {
    code,
    message
  }
});
