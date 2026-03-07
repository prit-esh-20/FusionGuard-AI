const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Recordings API working" });
});

module.exports = router;