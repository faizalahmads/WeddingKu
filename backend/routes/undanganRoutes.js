const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const { verifyToken } = require("../middleware/auth");
const db = require("../db");

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
      return res.status(404).json({ message: "Not found" });
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
router.post(
  "/undangan",
  verifyToken,
  upload.fields([
    { name: "groom_img", maxCount: 1 },
    { name: "bride_img", maxCount: 1 },
  ]),

  async (req, res) => {
    const admin_id = req.user.id;
    const {
      couple_name,
      groom_name,
      groom_img,
      groom_sosmed,
      bride_name,
      bride_img,
      bride_sosmed,
      wedding_date,
      deskripsi_kasih,
      location,
      maps_link,
      theme_id,
    } = req.body;

    const invitation_images = req.files
      ? JSON.stringify(req.files.map((file) => `/uploads/${file.filename}`))
      : "[]";

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const unique_code = Date.now().toString(36).toUpperCase();

    const sqlInsert = `
    INSERT INTO invitations 
    (couple_name, groom_name, groom_img, groom_sosmed, bride_name, bride_img, bride_sosmed, akad_date, resepsi_date, wedding_date, deskripsi_kasih, location, maps_link, theme_id, gallery_images, code, unique_code, admin_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    try {
      // 🔹 1. Simpan undangan baru
      const [result] = await db.query(sqlInsert, [
        couple_name,
        groom_name,
        groom_img,
        groom_sosmed,
        bride_name,
        bride_img,
        bride_sosmed,
        wedding_date,
        deskripsi_kasih,
        location,
        maps_link,
        theme_id,
        gallery_images,
        code,
        unique_code,
        admin_id,
      ]);

      const invitationId = result.insertId;

      const sqlUpdate = "UPDATE users SET invitation_id = ? WHERE id = ?";
      await db.query(sqlUpdate, [invitationId, admin_id]);

      res.status(201).json({
        message: "✅ Undangan berhasil dibuat dan dikaitkan dengan admin",
        id: invitationId,
        admin_id,
        code,
        unique_code,
      });
    } catch (err) {
      console.error("❌ Gagal tambah undangan:", err);
      res.status(500).json({ error: "Gagal menyimpan undangan" });
    }
  },
);

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
    const adminId = req.user.id; // 🔐 dari token

    const {
      couple_name,
      groom_name,
      groom_parent,
      groom_sosmed,
      bride_name,
      bride_parent,
      bride_sosmed,
      akad_date,
      resepsi_date,
      wedding_date,
      deskripsi_kasih,
      location,
      maps_link,
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
      bride_name,
      bride_parent,
      bride_sosmed,
      akad_date,
      resepsi_date,
      wedding_date,
      deskripsi_kasih,
      location,
      maps_link,
      theme_id,
      current_step,

      // ✅ BOOLEAN AMAN
      show_groom_parent: show_groom_parent ? 1 : 0,
      show_bride_parent: show_bride_parent ? 1 : 0,
      same_date: same_date ? 1 : 0,
      same_date_add: same_date_add ? 1 : 0,
      show_extra_event: show_extra_event ? 1 : 0,
      custom_music: custom_music ? 1 : 0,
      show_bank: show_bank ? 1 : 0,
      use_story: use_story ? 1 : 0,
      show_logo: show_logo ? 1 : 0,
      cover_mobile: cover_mobile ? 1 : 0,
      cover_desktop: cover_desktop ? 1 : 0,
    };

    // 📸 File upload
    if (req.files?.groom_img) {
      updateFields.groom_img = `/uploads/${req.files.groom_img[0].filename}`;
    }
    if (req.files?.bride_img) {
      updateFields.bride_img = `/uploads/${req.files.bride_img[0].filename}`;
    }
    if (req.files?.logo_img) {
      updateFields.logo_img = `/uploads/${req.files.logo_img[0].filename}`;
    }
    if (req.files?.cover_mobile_img) {
      updateFields.cover_mobile_img = `/uploads/${req.files.cover_mobile_img[0].filename}`;
    }
    if (req.files?.cover_desktop_img) {
      updateFields.cover_desktop_img = `/uploads/${req.files.cover_desktop_img[0].filename}`;
    }

    try {
      const [result] = await db.query(
        `
        UPDATE invitations 
        SET ? 
        WHERE id = ? AND admin_id = ?
        `,
        [updateFields, id, adminId], // 🔐 ownership check
      );

      if (result.affectedRows === 0) {
        return res.status(403).json({
          message: "Akses ditolak atau undangan tidak ditemukan",
        });
      }

      res.json({ message: "Undangan berhasil diupdate" });
    } catch (err) {
      console.error("Gagal update undangan:", err);
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

    const values = req.files.map((file, index) => [
      id,
      `/uploads/${file.filename}`,
      "gallery",
      index,
    ]);

    const sql = `
      INSERT INTO invitation_images
      (invitation_id, image_path, type, sort_order)
      VALUES ?
    `;

    await db.query(sql, [values]);

    res.json({ message: "Gallery uploaded" });
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

  await db.query("DELETE FROM invitation_images WHERE id = ?", [imageId]);

  res.json({ success: true, message: "Gallery deleted" });
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

      // 1️⃣ Ambil story lama
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

      // 2️⃣ Hapus lama
      await conn.query(
        "DELETE FROM invitation_stories WHERE invitation_id = ?",
        [id],
      );

      const files = req.files || {};

      // 3️⃣ Insert ulang + preserve image
      for (let i = 0; i < parsedStories.length; i++) {
        const imageFile = files[`story_images[${i}]`]?.[0];

        const imagePath = imageFile
          ? `/uploads/${imageFile.filename}`
          : oldImageMap[i] || null;

        await conn.query(
          `
          INSERT INTO invitation_stories
          (invitation_id, title, description, image_path, sort_order)
          VALUES (?, ?, ?, ?, ?)
          `,
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
    await db.query("DELETE FROM invitation_stories WHERE id = ?", [storyId]);

    res.json({ success: true, message: "Story deleted" });
  } catch (err) {
    console.error("Gagal hapus story:", err);
    res.status(500).json({ error: "Gagal hapus story" });
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

    // 2. Ambil data Events terkait
    const [eventResults] = await db.query(
      "SELECT * FROM events WHERE invitation_id = ? ORDER BY date, start_time",
      [id],
    );
    data.events = eventResults; // <--- Tambahkan array events ke objek data

    // 3. Parsing gallery_images (seperti kode Anda sebelumnya)
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
