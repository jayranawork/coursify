const ApiError = require("../utils/apiError");

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  const errors = error.errors || (error.name === "ValidationError" ? Object.values(error.errors).map((item) => item.message) : undefined);

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && errors.length ? { errors } : {}),
  });
};

module.exports = {
  notFound,
  errorHandler,
};
