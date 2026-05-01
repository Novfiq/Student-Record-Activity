require("dotenv").config();

const express = require("express");
const eventsRoutes =require("./routes/events");

const cors = require("cors");

const authRoutes =
  require("./routes/auth");

const activityRoutes =
  require("./routes/activities");

const reportRoutes =
  require("./routes/reports");

const eventRoutes =
  require("./routes/events");

const notificationRoutes =
  require("./routes/notifications");

const leaderboardRoutes =
  require("./routes/leaderboard");

const app = express();

/* ===== MIDDLEWARE ===== */

app.use(cors());
app.use("/events", eventsRoutes);

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

/* ===== ROUTES ===== */

app.use("/auth", authRoutes);

app.use("/activities", activityRoutes);

app.use("/reports", reportRoutes);

app.use("/events", eventRoutes);

app.use(
  "/notifications",
  notificationRoutes
);

app.use(
  "/leaderboard",
  leaderboardRoutes
);

/* ===== SERVER ===== */

app.listen(process.env.PORT || 5000);