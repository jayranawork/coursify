const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = ["MONGODB_URL", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "PORT"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}

const config = {
  port: Number(process.env.PORT),
  mongoUrl: process.env.MONGODB_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenTtl: "15m",
  refreshTokenTtl: "7d",
  bcryptSaltRounds: 12,
  corsOrigins: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  frontendUrl: process.env.FRONTEND_URL || "",
  lemonSqueezyApiKey: process.env.LEMONSQUEEZY_API_KEY || "",
  lemonSqueezyStoreId: process.env.LEMONSQUEEZY_STORE_ID || "",
  lemonSqueezyVariantId: process.env.LEMONSQUEEZY_VARIANT_ID || "",
  lemonSqueezyWebhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "",
};

module.exports = config;
