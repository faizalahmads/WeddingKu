const express = require("express");
const router = express.Router();
const db = require("../db");
const QRCode = require("qrcode");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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
      i.title,
      i.couple_name,
      i.groom_name,
      i.bride_name,
      i.wedding_date,
      i.location,
      i.maps_link,
      i.description,
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
    data.inviteUrl = `http://10.90.132.153:5173/undangan-${data.groom_name}-${data.bride_name}/${data.guest_code}`;

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

// ========================
// POST: Tambah undangan
// ========================
router.post("/undangan", upload.array("images[]", 10), async (req, res) => {
  const { groom_name, bride_name, wedding_date, location, maps_link, description, theme_id } = req.body;
  const gallery_images = req.files ? JSON.stringify(req.files.map(file => `/uploads/${file.filename}`)) : "[]";

  const sql = `
    INSERT INTO invitations (groom_name, bride_name, wedding_date, location, maps_link, description, theme_id, gallery_images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(sql, [
      groom_name, bride_name, wedding_date, location, maps_link, description, theme_id, gallery_images
    ]);

    res.status(201).json({ message: "Undangan berhasil dibuat", id: result.insertId });
  } catch (err) {
    console.error("Gagal tambah undangan:", err);
    res.status(500).json({ error: "Gagal menyimpan undangan" });
  }
});

// ========================
// PUT: Update undangan
// ========================
router.put("/undangan/:id", upload.array("images[]", 10), async (req, res) => {
  const { id } = req.params;
  const { groom_name, bride_name, wedding_date, location, maps_link, description, theme_id } = req.body;

  const updateFields = {
    groom_name, bride_name, wedding_date, location, maps_link, description, theme_id
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
    guest.inviteUrl = `http://10.90.132.153:5173/invite/${guest.code}`;
    res.json(guest);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

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
