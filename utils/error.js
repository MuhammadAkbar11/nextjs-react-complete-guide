export function yupError(error) {
  return error.inner.reduce((acc, err) => {
    acc[err.path] = err.message;
    return acc;
  }, {});
}

export function resAPIError(res, statusCode, error) {
  return res.status(statusCode).json(error);
}
