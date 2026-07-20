const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config");
const { notFound, errorHandler } = require("./middlewares/error");
const securityHeaders = require("./middlewares/security");
const requestLogger = require("./middlewares/requestLogger");
const { log } = require("./utils/logger");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollments");
const orderRoutes = require("./routes/orders");
const socialRoutes = require("./routes/social");
const dashboardRoutes = require("./routes/dashboards");
const uploadRoutes = require("./routes/uploads");
const platformRoutes = require("./routes/platform");
const playlistRoutes = require("./routes/playlists");

const app = express();

app.use(
  cors({
    origin: config.corsOrigins.length ? config.corsOrigins : true,
    credentials: true,
  })
);
app.use(securityHeaders);
app.use(requestLogger);
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = Buffer.from(buf);
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Coursify API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", socialRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/platform", platformRoutes);
app.use("/api/playlists", playlistRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    app.listen(config.port, () => {
      log("info", "server.started", { port: config.port });
    });
  } catch (error) {
    log("error", "server.startup_error", {
      error: { name: error?.name, message: error?.message, stack: error?.stack },
    });
    process.exit(1);
  }
};

start();
