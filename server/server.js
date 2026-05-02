require("dotenv").config();

const express = require("express");
const eventsRoutes =require("./routes/events");

app.use(cors({

  origin: "https://student-record-activity.vercel.app",

  methods: ["GET", "POST", "PUT", "DELETE"],

  credentials: true
}));

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});