const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config");
const { notFound, errorHandler } = require("./middlewares/error");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollments");
const orderRoutes = require("./routes/orders");
const socialRoutes = require("./routes/social");
const dashboardRoutes = require("./routes/dashboards");

const app = express();

app.use(
  cors({
    origin: config.corsOrigins.length ? config.corsOrigins : true,
    credentials: true,
  })
);
app.use(express.json());

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

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    app.listen(config.port, () => {
      console.log(`Coursify API running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
