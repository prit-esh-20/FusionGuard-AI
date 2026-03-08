const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.error("Login mapping error:", error);
        res.status(500).json({ error: "Server encountered error on login mapping" });
    }
});

module.exports = router;
