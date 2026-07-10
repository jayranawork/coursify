const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../utils/apiError");

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return req.headers.token || req.headers["x-access-token"] || null;
};

const requireAuth = (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      throw new ApiError(401, "Authentication token is required");
    }

    const decoded = jwt.verify(token, config.jwtAccessSecret);
    req.user = {
      id: decoded.sub,
      role: decoded.role,
      email: decoded.email,
    };
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired authentication token"));
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to access this resource"));
  }

  return next();
};

module.exports = {
  requireAuth,
  requireRole,
  getTokenFromRequest,
};
