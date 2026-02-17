const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const { verifyToken } = require("../middleware/auth");
const db = require("../db");
const fs = require("fs");
const path = require("path");

// ========================
// POST: Pilih Tema Undangan
// ========================
router.post("/invitations", async (req, res) => {
  const { admin_id, theme_id } = req.body;
  if (!admin_id || !theme_id)
    return res.status(400).json({ success: false, message: "Missing data" });

  try {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const unique_code = Date.now().toString(36).toUpperCase();

    const [result] = await db.query(
      `INSERT INTO invitations (admin_id, theme_id, code, unique_code, current_step) VALUES (?,?,?,?,?)`,
      [admin_id, theme_id, code, unique_code, "draft", 1],
    );

    return res.json({ success: true, invitation_id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ========================
// GET: invitation by admin
// ========================
router.get("/invitations/admin/:adminId", async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const [rows] = await db.query(
      `SELECT * FROM invitations WHERE admin_id = ? ORDER BY created_at DESC LIMIT 1`,
      [adminId],
    );
    if (rows.length === 0)
      return res.json(null);
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========================
// PUT: Update current step
// ========================
router.put("/invitations/:id/step", async (req, res) => {
  const id = req.params.id;
  const { current_step } = req.body;
  try {
    await db.query(`UPDATE invitations SET current_step = ? WHERE id = ?`, [
      current_step,
      id,
    ]);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

// ========================
// PUT: Update form data
// ========================
router.put("/invitations/:id/form", async (req, res) => {
  const id = req.params.id;
  const { form_data, status, current_step } = req.body;

  try {
    await db.query(
      `UPDATE invitations SET form_data = ?, status = COALESCE(?, status), current_step = COALESCE(?, current_step) WHERE id = ?`,
      [
        JSON.stringify(form_data || {}),
        status || null,
        current_step || null,
        id,
      ],
    );
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

// ========================
// POST: Tambah undangan
// ========================
router.post("/undangan", verifyToken, async (req, res) => {
  const admin_id = req.user.id;
  const { theme_id } = req.body;

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const unique_code = Date.now().toString(36).toUpperCase();

  const [result] = await db.query(
    `INSERT INTO invitations 
     (admin_id, theme_id, code, unique_code, current_step) 
     VALUES (?, ?, ?, ?, ?)`,
    [admin_id, theme_id, code, unique_code, 1],
  );

  res.json({ id: result.insertId });
});

// ========================
// PUT: Update undangan
// ========================
router.put(
  "/undangan/:id",
  verifyToken,
  upload.fields([
    { name: "groom_img", maxCount: 1 },
    { name: "bride_img", maxCount: 1 },
    { name: "logo_img", maxCount: 1 },
    { name: "cover_mobile_img", maxCount: 1 },
    { name: "cover_desktop_img", maxCount: 1 },
  ]),
  async (req, res) => {
    const { id } = req.params;
    const adminId = req.user.id;

    try {
      // 1️⃣ Ambil data lama dulu
      const [oldRows] = await db.query(
        "SELECT groom_img, bride_img, logo_img, cover_mobile_img, cover_desktop_img FROM invitations WHERE id = ? AND admin_id = ?",
        [id, adminId],
      );

      if (oldRows.length === 0) {
        return res.status(404).json({ message: "Undangan tidak ditemukan" });
      }

      const oldData = oldRows[0];

      // Helper hapus file
      const deleteOldFile = (filePath) => {
        if (!filePath) return;
        const fullPath = path.join(__dirname, "..", filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      };

      const {
        couple_name,
        groom_name,
        groom_parent,
        groom_sosmed,
        groom_bank,
        groom_norek,
        bride_name,
        bride_parent,
        bride_sosmed,
        bride_bank,
        bride_norek,
        akad_date,
        resepsi_date,
        wedding_date,
        deskripsi_kasih,
        location,
        maps_link,
        closing_deskripsi,
        theme_id,
        current_step,

        show_groom_parent,
        show_bride_parent,
        same_date,
        same_date_add,
        show_extra_event,
        custom_music,
        show_bank,
        use_story,
        show_logo,
        cover_mobile,
        cover_desktop,
      } = req.body;

      const updateFields = {
        couple_name,
        groom_name,
        groom_parent,
        groom_sosmed,
        groom_bank,
        groom_norek,
        bride_name,
        bride_parent,
        bride_sosmed,
        bride_bank,
        bride_norek,
        akad_date,
        resepsi_date,
        wedding_date,
        deskripsi_kasih,
        location,
        maps_link,
        closing_deskripsi,
        theme_id,
        current_step,

        // ✅ BOOLEAN AMAN
        show_groom_parent: Number(show_groom_parent) === 1 ? 1 : 0,
        show_bride_parent: Number(show_bride_parent) === 1 ? 1 : 0,
        same_date: Number(same_date) === 1 ? 1 : 0,
        same_date_add: Number(same_date_add) === 1 ? 1 : 0,
        show_extra_event: Number(show_extra_event) === 1 ? 1 : 0,
        custom_music: Number(custom_music) === 1 ? 1 : 0,
        show_bank: Number(show_bank) === 1 ? 1 : 0,
        use_story: Number(use_story) === 1 ? 1 : 0,
        show_logo: Number(show_logo) === 1 ? 1 : 0,
        cover_mobile: Number(cover_mobile) === 1 ? 1 : 0,
        cover_desktop: Number(cover_desktop) === 1 ? 1 : 0,
      };

      const newFiles = {};

      // 📸 Groom
      if (req.files?.groom_img) {
        newFiles.groom_img = `/uploads/${req.files.groom_img[0].filename}`;
        updateFields.groom_img = newFiles.groom_img;
      }

      // 📸 Bride
      if (req.files?.bride_img) {
        newFiles.bride_img = `/uploads/${req.files.bride_img[0].filename}`;
        updateFields.bride_img = newFiles.bride_img;
      }

      // 📸 Logo
      if (req.files?.logo_img) {
        newFiles.logo_img = `/uploads/${req.files.logo_img[0].filename}`;
        updateFields.logo_img = newFiles.logo_img;
      }

      // 📸 Cover Mobile
      if (req.files?.cover_mobile_img) {
        newFiles.cover_mobile_img = `/uploads/${req.files.cover_mobile_img[0].filename}`;
        updateFields.cover_mobile_img = newFiles.cover_mobile_img;
      }

      // 📸 Cover Desktop
      if (req.files?.cover_desktop_img) {
        newFiles.cover_desktop_img = `/uploads/${req.files.cover_desktop_img[0].filename}`;
        updateFields.cover_desktop_img = newFiles.cover_desktop_img;
      }

      // 2️⃣ Update DB dulu
      const [result] = await db.query(
        "UPDATE invitations SET ? WHERE id = ? AND admin_id = ?",
        [updateFields, id, adminId],
      );

      if (result.affectedRows === 0) {
        return res.status(403).json({ message: "Akses ditolak" });
      }

      // 3️⃣ Kalau sukses baru hapus file lama
      Object.keys(newFiles).forEach((key) => {
        deleteOldFile(oldData[key]);
      });

      res.json({ message: "Undangan berhasil diupdate" });
    } catch (err) {
      console.error("Gagal update:", err);
      res.status(500).json({ error: "Gagal update undangan" });
    }
  },
);

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
      i.groom_img,
      i.groom_parent,
      i.groom_sosmed,
      i.groom_bank,
      i.groom_norek,
      i.bride_name,
      i.bride_img,
      i.bride_parent,
      i.bride_sosmed,
      i.bride_bank,
      i.bride_norek,
      i.akad_date,
      i.resepsi_date,
      i.wedding_date,
      i.deskripsi_kasih,
      i.location,
      i.maps_link,
      i.closing_deskripsi,
      i.gallery_images,
      i.theme_id,
      i.show_groom_parent,
      i.show_bride_parent,
      i.same_date,
      i.use_story,
      i.show_logo,
      i.cover_mobile,
      i.cover_desktop

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
// Post: Gallery
// ========================
router.post(
  "/undangan/:id/gallery",
  verifyToken,
  upload.array("images", 10),
  async (req, res) => {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const conn = await db.getConnection();

    try {
      // 🔥 CEK TOTAL DULU (sebelum transaction)
      const [countRows] = await conn.query(
        "SELECT COUNT(*) as total FROM invitation_images WHERE invitation_id = ?",
        [id],
      );

      if (countRows[0].total + req.files.length > 10) {
        return res.status(400).json({ message: "Maksimal 10 gambar" });
      }

      await conn.beginTransaction();

      // 🔥 Ambil sort_order terakhir
      const [last] = await conn.query(
        "SELECT MAX(sort_order) as maxOrder FROM invitation_images WHERE invitation_id = ?",
        [id],
      );

      let startOrder = last[0].maxOrder !== null ? last[0].maxOrder + 1 : 0;

      const values = req.files.map((file, index) => [
        id,
        `/uploads/${file.filename}`,
        "gallery",
        startOrder + index,
      ]);

      await conn.query(
        `INSERT INTO invitation_images
         (invitation_id, image_path, type, sort_order)
         VALUES ?`,
        [values],
      );

      await conn.commit();
      res.json({ message: "Gallery berhasil ditambahkan" });
    } catch (err) {
      await conn.rollback();
      console.error(err);
      res.status(500).json({ message: "Upload gagal" });
    } finally {
      conn.release();
    }
  },
);

// ========================
// GET: Preview Gallery
// ========================
router.get("/invite/:id/gallery", async (req, res) => {
  // Alternatif get menjadi /:id/gallery atau /invite/:id/gallery
  const { id } = req.params;

  const [rows] = await db.query(
    `
    SELECT id, image_path, sort_order
    FROM invitation_images
    WHERE invitation_id = ?
    ORDER BY sort_order ASC
    `,
    [id],
  );

  res.status(200).json({
    success: true,
    total: rows.length,
    data: rows,
  });
});

// ========================
// DELETE: Hapus Gallery
// ========================
router.delete("/undangan/gallery/:imageId", verifyToken, async (req, res) => {
  const { imageId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT image_path FROM invitation_images WHERE id = ?",
      [imageId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Image tidak ditemukan" });
    }

    const imagePath = rows[0].image_path;

    if (imagePath) {
      const fullPath = path.join(__dirname, "..", imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await db.query("DELETE FROM invitation_images WHERE id = ?", [imageId]);

    res.json({ success: true, message: "Gallery deleted" });
  } catch (err) {
    console.error("Gagal hapus gallery:", err);
    res.status(500).json({ error: "Gagal hapus gallery" });
  }
});

// ========================
// PUT: Simpan Cerita Cinta
// ========================
router.put(
  "/undangan/:id/stories",
  verifyToken,
  upload.fields(
    Array.from({ length: 10 }, (_, i) => ({
      name: `story_images[${i}]`,
      maxCount: 1,
    })),
  ),
  async (req, res) => {
    const { id } = req.params;
    const { stories } = req.body;

    const conn = await db.getConnection();

    try {
      const parsedStories = JSON.parse(stories || "[]");

      await conn.beginTransaction();

      const [oldStories] = await conn.query(
        `
        SELECT sort_order, image_path
        FROM invitation_stories
        WHERE invitation_id = ?
        ORDER BY sort_order ASC
        `,
        [id],
      );

      const oldImageMap = {};
      oldStories.forEach((s) => {
        oldImageMap[s.sort_order] = s.image_path;
      });

      oldStories.forEach((story) => {
        if (story.image_path) {
          const fullPath = path.join(__dirname, "..", story.image_path);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
      });

      await conn.query(
        "DELETE FROM invitation_stories WHERE invitation_id = ?",
        [id],
      );

      const files = req.files || {};

      for (let i = 0; i < parsedStories.length; i++) {
        const imageFile = files[`story_images[${i}]`]?.[0];

        let imagePath;

        if (imageFile) {
          if (oldImageMap[i]) {
            const oldPath = path.join(__dirname, "..", oldImageMap[i]);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }

          imagePath = `/uploads/${imageFile.filename}`;
        } else {
          imagePath = oldImageMap[i] || null;
        }

        await conn.query(
          `INSERT INTO invitation_stories
          (invitation_id, title, description, image_path, sort_order)
          VALUES (?, ?, ?, ?, ?)`,
          [
            id,
            parsedStories[i].title,
            parsedStories[i].description,
            imagePath,
            i,
          ],
        );
      }

      await conn.commit();
      res.json({ success: true, message: "Story berhasil disimpan" });
    } catch (err) {
      await conn.rollback();
      console.error("❌ Gagal simpan story:", err);
      res.status(500).json({ error: "Gagal simpan story" });
    } finally {
      conn.release();
    }
  },
);

// ========================
// GET: Cerita Cinta
// ========================
router.get("/undangan/:id/stories", async (req, res) => {
  const { id } = req.params;

  const [rows] = await db.query(
    `
    SELECT id, title, description, image_path
    FROM invitation_stories
    WHERE invitation_id = ?
    ORDER BY sort_order ASC
    `,
    [id],
  );

  res.json(rows);
});

// ========================
// DELETE: Hapus Story
// ========================
router.delete("/undangan/stories/:storyId", verifyToken, async (req, res) => {
  const { storyId } = req.params;

  try {
    // 1️⃣ Ambil image_path dulu
    const [rows] = await db.query(
      "SELECT image_path FROM invitation_stories WHERE id = ?",
      [storyId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Story tidak ditemukan" });
    }

    const imagePath = rows[0].image_path;

    // 2️⃣ Hapus file fisik kalau ada
    if (imagePath) {
      const fullPath = path.join(__dirname, "..", imagePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // 3️⃣ Hapus dari database
    await db.query("DELETE FROM invitation_stories WHERE id = ?", [storyId]);

    res.json({ success: true, message: "Story deleted" });
  } catch (err) {
    console.error("Gagal hapus story:", err);
    res.status(500).json({ error: "Gagal hapus story" });
  }
});

// ========================
// PUT: Update Events
// ========================
router.put("/undangan/:id/events", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { events } = req.body;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query("DELETE FROM invitation_events WHERE invitation_id = ?", [id]);

    for (let i = 0; i < events.length; i++) {
      const e = events[i];

      await conn.query(
        `INSERT INTO invitation_events 
        (invitation_id, type, start_time, end_time)
        VALUES (?, ?, ?, ?)`,
        [
          id,
          e.type,
          e.start_time || null,
          e.end_time || null,
        ],
      );
    }

    await conn.commit();
    res.json({ success: true });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: "Gagal update events" });
  } finally {
    conn.release();
  }
});

// ========================
// GET: Undangan berdasarkan kode tamu (untuk contoh)
// ========================
router.get("/invite/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const [results] = await db.query("SELECT * FROM guests WHERE code = ?", [
      code,
    ]);

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

// ========================
// GET: Undangan berdasarkan ID
// ========================
router.get("/undangan/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Ambil data Undangan
    const [invitationResults] = await db.query(
      "SELECT * FROM invitations WHERE id = ?",
      [id],
    );
    if (invitationResults.length === 0) {
      return res
        .status(404)
        .json({ message: "Undangan tidak ditemukan berdasarkan ID" });
    }
    const data = invitationResults[0];

    const [storyResults] = await db.query(
      "SELECT * FROM invitation_stories WHERE invitation_id = ? ORDER BY sort_order",
      [id],
    );

    data.stories = storyResults;

    const [eventResults] = await db.query(
      "SELECT * FROM invitation_events WHERE invitation_id = ? ORDER BY type, start_time",
      [id],
    );
    data.invitation_events = eventResults;

    try {
      data.gallery_images = data.gallery_images
        ? JSON.parse(data.gallery_images)
        : [];
    } catch {
      data.gallery_images = [];
    }

    res.json(data);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Gagal mengambil data undangan" });
  }
});

module.exports = router;
