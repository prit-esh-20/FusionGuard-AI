const express = require("express");
const router = express.Router();
const pool = require("../db");


/* GET all users */

router.get("/", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


/* CREATE new user */

router.post("/", async (req, res) => {

  const { name, email, role, status } = req.body;

  try {

    const result = await pool.query(
      `INSERT INTO users (name,email,role,status)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [name, email, role, status]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User creation failed" });
  }
});


/* DELETE user */

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    await pool.query(
      "DELETE FROM users WHERE id=$1",
      [id]
    );

    res.json({ message: "User deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
});


module.exports = router;