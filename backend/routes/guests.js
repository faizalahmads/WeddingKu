const express = require("express");
const router = express.Router();
const db = require("../db");
const QRCode = require("qrcode");
const multer = require("multer");

// ========================
// GET: Semua tamu berdasarkan adminId
// ========================
router.get("/guests/:adminId", async (req, res) => {
  const { adminId } = req.params;
  const sql = `
    SELECT 
      g.id, g.name, g.type, g.category, g.code, g.admin_id,
      i.groom_name, i.bride_name
    FROM guests g
    LEFT JOIN invitations i ON g.invitation_id = i.id
    WHERE g.admin_id = ?
  `;

  try {
    const [results] = await db.query(sql, [adminId]);
    res.json(results);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ========================
// DELETE: Hapus tamu
// ========================
router.delete("/guests/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM guests WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    console.error("Gagal hapus data:", err);
    res.status(500).json({ error: "Gagal hapus data" });
  }
});

// ========================
// POST: Tambah tamu baru
// ========================
router.post("/guests", async (req, res) => {
  const { name, type, category, admin_id } = req.body;

  if (!name || !type || !category || !admin_id) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  try {
    const [userResult] = await db.query("SELECT invitation_id FROM users WHERE id = ?", [admin_id]);

    if (userResult.length === 0 || !userResult[0].invitation_id) {
      return res.status(400).json({ error: "Admin belum memiliki undangan" });
    }

    const invitation_id = userResult[0].invitation_id;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const [result] = await db.query(`
      INSERT INTO guests (name, type, category, code, admin_id, invitation_id)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, type, category, code, admin_id, invitation_id]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      type,
      category,
      code,
      admin_id,
      invitation_id
    });
  } catch (err) {
    console.error("Gagal tambah data:", err);
    res.status(500).json({ error: "Gagal tambah data" });
  }
});

// ========================
// GET: Summary tamu berdasarkan adminId
// ========================
router.get("/guests/summary/:adminId", async (req, res) => {
  const { adminId } = req.params;

  const query = `
    SELECT type, category, COUNT(*) AS count
    FROM guests
    WHERE admin_id = ?
    GROUP BY type, category
  `;

  try {
    const [results] = await db.query(query, [adminId]);

    const summary = {
      CPP: 0,
      CPW: 0,
      TamuTambahan: 0,
      VIP: 0,
      Reguler: 0,
      total: 0,
    };

    results.forEach((row) => {
      if (row.type === "CPP") summary.CPP += row.count;
      if (row.type === "CPW") summary.CPW += row.count;
      if (row.type === "Tamu Tambahan") summary.TamuTambahan += row.count;

      if (row.category === "VIP") summary.VIP += row.count;
      if (row.category === "Reguler") summary.Reguler += row.count;

      summary.total += row.count;
    });

    res.json(summary);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query error" });
  }
});

// ========================
// GET: Undangan berdasarkan adminId
// ========================
router.get("/admin/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await db.query("SELECT * FROM invitations WHERE admin_id = ? LIMIT 1", [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Undangan belum dibuat" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

module.exports = router;
