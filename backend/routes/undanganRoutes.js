const express = require("express");
const multer = require("multer");
const router = express.Router();
const { createUndangan, getUndanganByCode } = require("../controllers/undanganController");
const upload = multer({ dest: "uploads/" });
const { verifyToken } = require("../middleware/auth");
const db = require("../db");

// ========================
// POST: Tambah undangan
// ========================
router.post("/undangan", verifyToken, upload.array("images[]", 10), async (req, res) => {
  const admin_id = req.user.id; // 🔹 diambil dari token JWT
  const {
    groom_name,
    bride_name,
    wedding_date,
    location,
    maps_link,
    theme_id
  } = req.body;

  const gallery_images = req.files
    ? JSON.stringify(req.files.map((file) => `/uploads/${file.filename}`))
    : "[]";

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const unique_code = Date.now().toString(36).toUpperCase();

  const sqlInsert = `
    INSERT INTO invitations 
    (groom_name, bride_name, wedding_date, location, maps_link, theme_id, gallery_images, code, unique_code, admin_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    // 🔹 1. Simpan undangan baru
    const [result] = await db.query(sqlInsert, [
      groom_name,
      bride_name,
      wedding_date,
      location,
      maps_link,
      theme_id,
      gallery_images,
      code,
      unique_code,
      admin_id
    ]);

    const invitationId = result.insertId;

    // 🔹 2. Update kolom invitation_id di tabel users
    const sqlUpdate = "UPDATE users SET invitation_id = ? WHERE id = ?";
    await db.query(sqlUpdate, [invitationId, admin_id]);

    // 🔹 3. Kirim respon
    res.status(201).json({
      message: "✅ Undangan berhasil dibuat dan dikaitkan dengan admin",
      id: invitationId,
      admin_id,
      code,
      unique_code
    });
  } catch (err) {
    console.error("❌ Gagal tambah undangan:", err);
    res.status(500).json({ error: "Gagal menyimpan undangan" });
  }
});


// ========================
// PUT: Update undangan
// ========================
router.put("/undangan/:id", upload.array("images[]", 10), async (req, res) => {
  const { id } = req.params;
  const { groom_name, bride_name, wedding_date, location, maps_link, theme_id } = req.body;

  const updateFields = {
    groom_name, bride_name, wedding_date, location, maps_link, theme_id
  };

  try {
    const [result] = await db.query("UPDATE invitations SET ? WHERE id = ?", [updateFields, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Undangan tidak ditemukan untuk diupdate" });
    }

    res.json({ message: "Undangan berhasil diupdate" });
  } catch (err) {
    console.error("Gagal update undangan:", err);
    res.status(500).json({ error: "Gagal update undangan" });
  }
});

// ========================
// GET: Undangan berdasarkan name & code
// ========================
router.get("/undangan/:name/:code", async (req, res) => {
  const { name, code } = req.params;

  const sql = `
    SELECT 
      g.id AS guest_id,
      g.name AS guest_name,
      g.category AS guest_category,
      g.code AS guest_code,
      i.id AS invitation_id,
      i.couple_name,
      i.groom_name,
      i.bride_name,
      i.wedding_date,
      i.location,
      i.maps_link,
      i.gallery_images,
      i.theme_id
    FROM guests g
    LEFT JOIN invitations i ON g.invitation_id = i.id
    WHERE g.code = ? AND g.name = ?
  `;

  try {
    const [results] = await db.query(sql, [code, name]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Undangan tidak ditemukan" });
    }

    const data = results[0];
    data.inviteUrl = `http://localhost:5173/undangan-${data.groom_name}-${data.bride_name}/${data.guest_code}`;

    // Parse gallery_images
    if (data.gallery_images) {
      try {
        data.gallery_images = JSON.parse(data.gallery_images);
      } catch {
        data.gallery_images = [];
      }
    }

    res.json(data);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ========================
// GET: Undangan berdasarkan kode tamu
// ========================
router.get("/invite/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const [results] = await db.query("SELECT * FROM guests WHERE code = ?", [code]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Undangan tidak ditemukan" });
    }

    const guest = results[0];
    guest.inviteUrl = `http://localhost:5173/invite/${guest.code}`;
    res.json(guest);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// routes/invitationRoutes.js
router.get("/invitations/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM invitations WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Invitation not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ========================
// GET: Undangan berdasarkan ID
// ========================
router.get("/undangan/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM invitations WHERE id = ?";

  try {
    const [results] = await db.query(sql, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Undangan tidak ditemukan berdasarkan ID" });
    }

    const data = results[0];
    try {
      data.gallery_images = data.gallery_images ? JSON.parse(data.gallery_images) : [];
    } catch {
      data.gallery_images = [];
    }

    res.json(data);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Gagal mengambil data undangan" });
  }
});

// 📥 GET /api/undangan/:code → Ambil undangan berdasarkan code
router.get("/:code", (req, res) => {
  getUndanganByCode(req.params.code, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result) return res.status(404).json({ message: "Undangan tidak ditemukan" });
    res.json(result);
  });
});

module.exports = router;
