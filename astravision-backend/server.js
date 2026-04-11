require("dotenv").config();
const pool = require("./db");

const initializeAlerts = async () => {
    try {
        await pool.query("DELETE FROM alerts");
        console.log("Database cleared: Previous alerts removed for new session.");

        // Insert default alerts for a balanced dashboard
        const defaultAlerts = [
            { message: "System monitoring active", severity: "SUCCESS" },
            { message: "Network online", severity: "SUCCESS" },
            { message: "Battery level low", severity: "WARNING" }
        ];

        for (const alert of defaultAlerts) {
            await pool.query(
                "INSERT INTO alerts (message, severity, created_at) VALUES ($1, $2, NOW())",
                [alert.message, alert.severity]
            );
        }
        console.log("Default alerts initialized.");
    } catch (err) {
        console.error("Error initializing alerts table:", err);
    }
};
initializeAlerts();

const metricsRoutes = require("./routes/metrics");
const configRoutes = require("./routes/config");
const express = require("express");
const cors = require("cors");

const robotRoutes = require("./routes/robot");
const alertRoutes = require("./routes/alerts");
const recordingRoutes = require("./routes/recordings");
const logRoutes = require("./routes/logs");
const usersRoute = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/robot", robotRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/recordings", recordingRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/config", configRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.send("AstraVision Backend Running");
});

const PORT = process.env.PORT || 3000;

setInterval(async () => {
  try {
    const fetch = global.fetch;
    const res = await fetch(`http://localhost:${PORT}/api/robot/detect-live`);
    const data = await res.json();
    console.log("Auto Detection:", data);
  } catch (error) {
    console.error("Auto detection failed:", error.message);
  }
}, 2000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});