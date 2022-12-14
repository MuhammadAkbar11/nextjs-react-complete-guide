export function yupError(error) {
  return error.inner.reduce((acc, err) => {
    acc[err.path] = err.message;
    return acc;
  }, {});
}

function BaseError(
  message = "Something Went Wrong",
  statusCode = 500,
  name = "BASE_ERROR",
  errors = {}
) {
  this.name = name;
  this.message = message;
  this.statusCode = statusCode;
  this.errors = errors;
  this.stack = new Error().stack;
}

BaseError.prototype = Object.create(Error.prototype);
BaseError.prototype.constructor = BaseError;

export function ToBaseError(err) {
  const instance = Object.create(BaseError.prototype);
  instance.constructor(err?.message, err?.statusCode, err?.name, err?.errors);
  instance.stack = err?.stack || new Error().stack;
  return instance;
}

export function resAPIError(res, error) {
  const statusCode = error.statusCode;
  return res.status(statusCode).json(error);
}

export async function validation(body, schema) {
  try {
    const resultBody = await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    return resultBody;
  } catch (error) {
    throw new BaseError("Bad Validation", 422, "ERR_VALIDATION", {
      validation: yupError(error),
    });
  }
}
