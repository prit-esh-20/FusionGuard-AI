const express = require("express");
const router = express.Router();
const pool = require("../db");
const axios = require("axios");
const FormData = require("form-data");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const ML_API_URL = "https://astravision.onrender.com/predict";

/* GET robot status */

router.get("/status", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM robot_status ORDER BY updated_at DESC LIMIT 1"
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch robot status" });
  }
});

/* UPDATE robot status */

router.post("/status", async (req, res) => {
  try {
    const { battery_level, location, mode, status } = req.body;

    const result = await pool.query(
      "INSERT INTO robot_status (battery_level, location, mode, status) VALUES ($1,$2,$3,$4) RETURNING *",
      [battery_level, location, mode, status]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update robot status" });
  }
});


router.get("/detect-live", async (req, res) => {
  try {
    const espResponse = await fetch("http://10.77.189.134/capture");
    const imageBuffer = Buffer.from(await espResponse.arrayBuffer());

    const formData = new FormData();
    formData.append("file", imageBuffer, "live.jpg");

    const mlResponse = await axios.post(ML_API_URL, formData, {
      headers: formData.getHeaders(),
    });

    const result = mlResponse.data;

    if (result.prediction === "Human") {
      await pool.query(
        "INSERT INTO alerts (message, severity, created_at) VALUES ($1, $2, NOW())",
        ["Live human detected by ESP32-CAM", "CRITICAL"]
      );
    }

    res.json(result);
  } catch (error) {
    console.error("Live detection failed:", error.message);
    res.status(500).json({ error: "Live detection failed" });
  }
});

module.exports = router;
