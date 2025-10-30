const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");
const QRCode = require("qrcode");
const multer = require("multer");

// ========================
// Helper: Generate kode unik
// ========================
function generateUniqueCode() {
  const random = crypto.randomUUID().slice(0, 6).toUpperCase();
  const timePart = Date.now().toString(36).slice(-2).toUpperCase();
  return `WDK-${timePart}${random}`;
}

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
// POST: Import tamu dari CSV (tanpa loop berat, retry aman)
// ========================
router.post("/guests/import", async (req, res) => {
  const { admin_id, guests } = req.body;

  if (!admin_id || !Array.isArray(guests)) {
    return res.status(400).json({ message: "Data tidak valid" });
  }

  try {
    // 🔹 Ambil invitation_id dari users
    const [userResult] = await db.query(
      "SELECT invitation_id FROM users WHERE id = ?",
      [admin_id]
    );

    if (userResult.length === 0 || !userResult[0].invitation_id) {
      return res.status(400).json({ message: "Admin belum memiliki undangan" });
    }

    const invitation_id = userResult[0].invitation_id;

    // 🔹 Generate kode unik cepat
    const codesArray = guests.map(() => generateUniqueCode());

    // 🔹 Siapkan data untuk insert
    const values = guests.map((g, i) => [
      g.name,
      g.category,
      g.type,
      codesArray[i],
      admin_id,
      invitation_id,
    ]);

    // 🔹 Insert sekaligus
    await db.query(
      `
      INSERT INTO guests (name, category, type, code, admin_id, invitation_id)
      VALUES ?
      `,
      [values]
    );

    res.status(201).json({
      message: "Import berhasil ✅ semua kode unik otomatis dibuat",
    });
  } catch (error) {
    console.error("Gagal import CSV:", error);

    // 🔁 Jika ada kode duplikat, coba ulang sekali dengan kode baru
    if (error.code === "ER_DUP_ENTRY") {
      try {
        console.warn("⚠️ Kode duplikat terdeteksi, regenerasi otomatis...");

        const newValues = req.body.guests.map((g) => [
          g.name,
          g.category,
          g.type,
          generateUniqueCode(),
          req.body.admin_id,
          (userResult && userResult[0]?.invitation_id) || null,
        ]);

        await db.query(
          `INSERT INTO guests (name, category, type, code, admin_id, invitation_id) VALUES ?`,
          [newValues]
        );

        return res.status(201).json({
          message: "Import berhasil setelah regenerasi kode duplikat 🔄",
        });
      } catch (retryErr) {
        console.error("Gagal regenerasi:", retryErr);
        return res
          .status(500)
          .json({ message: "Gagal setelah regenerasi kode duplikat" });
      }
    }

    res.status(500).json({ message: "Gagal menyimpan data CSV" });
  }
});

// ========================
// POST: Tambah tamu baru (kode unik cepat + retry aman)
// ========================
router.post("/guests", async (req, res) => {
  const { name, type, category, admin_id } = req.body;

  if (!name || !type || !category || !admin_id) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  try {
    // 🔹 Ambil invitation_id
    const [userResult] = await db.query(
      "SELECT invitation_id FROM users WHERE id = ?",
      [admin_id]
    );

    if (userResult.length === 0 || !userResult[0].invitation_id) {
      return res.status(400).json({ error: "Admin belum memiliki undangan" });
    }

    const invitation_id = userResult[0].invitation_id;
    let code = generateUniqueCode();

    // 🔹 Simpan ke DB (dengan retry 1x jika duplikat)
    try {
      const [result] = await db.query(
        `
        INSERT INTO guests (name, type, category, code, admin_id, invitation_id)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [name, type, category, code, admin_id, invitation_id]
      );

      return res.status(201).json({
        message: "Tamu berhasil ditambahkan dengan kode unik",
        id: result.insertId,
        name,
        type,
        category,
        code,
      });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        // Retry sekali
        code = generateUniqueCode();
        const [resultRetry] = await db.query(
          `
          INSERT INTO guests (name, type, category, code, admin_id, invitation_id)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
          [name, type, category, code, admin_id, invitation_id]
        );

        return res.status(201).json({
          message: "Tamu berhasil ditambahkan (retry duplikat) ✅",
          id: resultRetry.insertId,
          name,
          type,
          category,
          code,
        });
      }

      throw err;
    }
  } catch (err) {
    console.error("Gagal tambah data:", err);
    res.status(500).json({ error: "Gagal tambah data" });
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
