const express = require("express");
const router = express.Router();
const db = require("../db");

// 🟢 POST pilih tema oleh admin
router.post("/select-theme", (req, res) => {
  const { admin_id, invitation_id } = req.body;

  // Simpan pilihan admin (bisa disimpan di tabel lain misalnya admin_themes)
  db.query(
    "INSERT INTO admin_themes (admin_id, invitation_id) VALUES (?, ?)",
    [admin_id, invitation_id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Tema berhasil dipilih!" });
    }
  );
});

module.exports = router;
