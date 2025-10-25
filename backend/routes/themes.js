const express = require("express");
const db = require("../db");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
        "SELECT id, name, description, preview_url FROM themes"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data tema" });
  }
});

module.exports = router;
