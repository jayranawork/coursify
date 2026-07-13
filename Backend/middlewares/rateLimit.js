const buckets = new Map();

const getClientKey = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (forwardedFor) {
    return String(forwardedFor).split(",")[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || "unknown";
};

const rateLimit = ({ windowMs = 60_000, max = 10, message = "Too many requests, please try again later." } = {}) => {
  return (req, res, next) => {
    const now = Date.now();
    const key = `${getClientKey(req)}:${req.originalUrl}`;
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      return next();
    }

    if (bucket.count >= max) {
      return res.status(429).json({
        success: false,
        message,
      });
    }

    bucket.count += 1;
    buckets.set(key, bucket);
    return next();
  };
};

module.exports = rateLimit;
