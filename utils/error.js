export const yupError = error => {
  return error.inner.reduce((acc, err) => {
    acc[err.path] = err.message;
    return acc;
  }, {});
};
