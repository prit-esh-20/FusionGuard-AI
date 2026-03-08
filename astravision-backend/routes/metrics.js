const express = require("express");
const router = express.Router();
const pool = require("../db");

/* Robot sends system metrics */

router.post("/", async (req, res) => {

  const { uptime, cpu_load, battery_voltage, wifi_signal } = req.body;

  const result = await pool.query(
    "INSERT INTO robot_metrics (uptime, cpu_load, battery_voltage, wifi_signal) VALUES ($1,$2,$3,$4) RETURNING *",
    [uptime, cpu_load, battery_voltage, wifi_signal]
  );

  res.json(result.rows[0]);

});

/* Dashboard fetch latest metrics */

router.get("/", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM robot_metrics ORDER BY created_at DESC LIMIT 1"
  );

  res.json(result.rows[0]);

});

module.exports = router;