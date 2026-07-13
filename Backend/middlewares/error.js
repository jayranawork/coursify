const ApiError = require("../utils/apiError");

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const normalizeErrors = (errors) => {
  if (!errors) return [];
  if (Array.isArray(errors)) return errors;
  return Object.values(errors).flatMap((value) => value);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const normalizedErrors = normalizeErrors(error.errors || (error.name === "ValidationError" ? error.errors : undefined));
  const validationMessage =
    normalizedErrors
      .map((item) => {
        if (typeof item === "string") return item;
        return item?.message || item?.msg || item?.reason || "";
      })
      .filter(Boolean)[0] || "Validation failed";
  const message = error.message === "Validation failed" && normalizedErrors.length ? validationMessage : error.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
    ...(normalizedErrors.length ? { errors: normalizedErrors } : {}),
  });
};

module.exports = {
  notFound,
  errorHandler,
};
