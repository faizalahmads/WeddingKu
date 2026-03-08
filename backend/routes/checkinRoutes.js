const express = require("express");
const crypto = require("crypto");
const { verifyToken } = require("../middleware/auth");
const db = require("../db");

const router = express.Router();

// ========================
// POST: Generate Link Check-in
// ========================
router.post("/generate-link", verifyToken, async (req, res) => {
  const conn = await db.getConnection();

  try {
    const adminId = req.user.id;
    const { invitation_id } = req.body;

    if (!invitation_id) {
      return res.status(400).json({
        message: "invitation_id wajib diisi",
      });
    }

    const [invitation] = await conn.query(
      `SELECT id FROM invitations 
       WHERE id = ? AND admin_id = ?`,
      [invitation_id, adminId]
    );

    if (invitation.length === 0) {
      return res.status(403).json({
        message: "Akses ditolak",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 24);

    await conn.beginTransaction();

    await conn.query(
      `UPDATE checkin_tokens 
       SET is_active = 0 
       WHERE invitation_id = ?`,
      [invitation_id]
    );

    // ➕ 3️⃣ Insert link baru
    await conn.query(
      `INSERT INTO checkin_tokens 
       (invitation_id, token, expired_at, is_active, created_at)
       VALUES (?, ?, ?, 1, NOW())`,
      [invitation_id, token, expiredAt]
    );

    await conn.commit();

    const link = `${process.env.FRONTEND_URL}/checkin?token=${token}`;

    res.json({
      success: true,
      message: "Link check-in berhasil dibuat",
      link,
      token,
      expired_at: expiredAt,
    });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  } finally {
    conn.release();
  }
});

// ========================
// PUT: NON-ACTIVATE LINK
// ========================
router.put("/deactivate/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(`UPDATE checkin_tokens SET is_active = 0 WHERE id = ?`, [
      id,
    ]);

    res.json({ success: true, message: "Link dinonaktifkan" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ========================
// GET: Link FE
// ========================
router.get("/links/:invitation_id", verifyToken, async (req, res) => {
  const { invitation_id } = req.params;

  const [rows] = await db.query(
    `SELECT id, token, expired_at, is_active, created_at
     FROM checkin_tokens
     WHERE invitation_id = ?
     ORDER BY created_at DESC`,
    [invitation_id],
  );

  const data = rows.map((row) => ({
    ...row,
    link: `${process.env.FRONTEND_URL}/checkin?token=${row.token}`,
  }));

  res.json({
    success: true,
    data,
  });
});

// ========================
// GET: Validate Token Check-in
// ========================
router.get("/validate-token", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        valid: false,
        message: "Token tidak ditemukan",
      });
    }

    const [rows] = await db.query(
      `SELECT invitation_id, expired_at, is_active 
       FROM checkin_tokens 
       WHERE token = ?`,
      [token]
    );

    if (rows.length === 0) {
      return res.status(403).json({
        valid: false,
        message: "Token tidak valid",
      });
    }

    const tokenData = rows[0];

    if (!tokenData.is_active) {
      return res.status(403).json({
        valid: false,
        message: "Token sudah tidak aktif",
      });
    }

    if (new Date(tokenData.expired_at) < new Date()) {
      return res.status(403).json({
        valid: false,
        message: "Token sudah expired",
      });
    }

    res.json({
      valid: true,
      invitation_id: tokenData.invitation_id,
    });

  } catch (err) {
    console.error("Validate token error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ========================
// POST: Scan QR Tamu
// ========================
router.post("/scan", async (req, res) => {
  try {
    const { token, guest_code } = req.body;

    if (!token || !guest_code) {
      return res.status(400).json({
        message: "token dan guest_code wajib diisi",
      });
    }

    // cek token
    const [tokenRows] = await db.query(
      `SELECT invitation_id FROM checkin_tokens 
       WHERE token = ? AND is_active = 1`,
      [token],
    );

    if (tokenRows.length === 0) {
      return res.status(403).json({
        message: "Token tidak valid",
      });
    }

    const invitationId = tokenRows[0].invitation_id;

    // cari tamu
    const [guestRows] = await db.query(
      `SELECT id, name, is_checked_in 
       FROM guests 
       WHERE code = ? AND invitation_id = ?`,
      [guest_code, invitationId],
    );

    if (guestRows.length === 0) {
      return res.status(404).json({
        message: "Tamu tidak ditemukan",
      });
    }

    const guest = guestRows[0];

    if (guest.is_checked_in) {
      return res.status(400).json({
        message: "Tamu sudah check-in",
      });
    }

    await db.query(
      `UPDATE guests 
       SET is_checked_in = 1, checked_in_at = NOW() 
       WHERE id = ?`,
      [guest.id],
    );

    res.json({
      success: true,
      message: "Check-in berhasil",
      guest_name: guest.name,
    });
  } catch (err) {
    console.error("Scan checkin error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// ========================
// GET: Search Guest by Name
// ========================
router.get("/search", async (req, res) => {
  try {
    const { token, name } = req.query;

    if (!token || !name) {
      return res.status(400).json({
        message: "token dan name wajib diisi",
      });
    }

    const [tokenRows] = await db.query(
      `SELECT invitation_id 
       FROM checkin_tokens 
       WHERE token = ? AND is_active = 1`,
      [token]
    );

    if (tokenRows.length === 0) {
      return res.status(403).json({
        message: "Token tidak valid",
      });
    }

    const invitationId = tokenRows[0].invitation_id;

    const [guests] = await db.query(
      `SELECT id, name, code, category, is_checked_in 
       FROM guests
       WHERE invitation_id = ?
       AND name LIKE ?
       ORDER BY name ASC
       LIMIT 10`,
      [invitationId, `%${name}%`]
    );

    res.json({
      success: true,
      data: guests,
    });

  } catch (err) {
    console.error("Search guest error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ========================
// GET: Total Hadir
// ========================
router.get("/total/:invitation_id", async (req, res) => {
  try {
    const { invitation_id } = req.params;

    const [rows] = await db.query(
      `SELECT COUNT(*) as total
       FROM guests
       WHERE invitation_id = ?
       AND is_checked_in = 1`,
      [invitation_id]
    );

    res.json({
      success: true,
      total: rows[0].total,
    });
  } catch (err) {
    console.error("Get total error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ========================
// GET: Detail Guest by Code (UNTUK MODAL)
// ========================
router.get("/guest-detail", async (req, res) => {
  try {
    const { token, guest_code } = req.query;

    if (!token || !guest_code) {
      return res.status(400).json({
        message: "token dan guest_code wajib diisi",
      });
    }

    const [tokenRows] = await db.query(
      `SELECT invitation_id 
       FROM checkin_tokens 
       WHERE token = ? AND is_active = 1`,
      [token]
    );

    if (tokenRows.length === 0) {
      return res.status(403).json({
        message: "Token tidak valid",
      });
    }

    const invitationId = tokenRows[0].invitation_id;

    const [guestRows] = await db.query(
      `SELECT id, name, code, category, is_checked_in
       FROM guests
       WHERE code = ? AND invitation_id = ?`,
      [guest_code, invitationId]
    );

    if (guestRows.length === 0) {
      return res.status(404).json({
        message: "Tamu tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: guestRows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ========================
// GET: List Buku Tamu
// ========================
router.get("/guest-list", verifyToken, async (req, res) => {
  const { search = "", filter = "all", page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  let where = "WHERE 1=1";
  let params = [];

  if (search) {
    where += " AND name LIKE ?";
    params.push(`%${search}%`);
  }

  if (filter === "hadir") {
    where += " AND is_checked_in = 1";
  }

  if (filter === "belum") {
    where += " AND is_checked_in = 0";
  }

  const [rows] = await db.query(
    `SELECT id, name, category, type, is_checked_in
     FROM guests
     ${where}
     LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  );

  const [count] = await db.query(
    `SELECT COUNT(*) as total
     FROM guests
     ${where}`,
    params,
  );

  res.json({
    data: rows,
    total: count[0].total,
  });
});

// ========================
// PUT: Batalkan Checkin
// ========================
router.put("/cancel/:id", async (req, res) => {
  const { id } = req.params;

  await db.query(
    `UPDATE guests 
     SET is_checked_in = 0, checked_in_at = NULL
     WHERE id = ?`,
    [id],
  );

  res.json({ success: true });
});

// ========================
// Helper: Generate kode unik
// ========================
function generateUniqueCode() {
  const random = crypto.randomUUID().slice(0, 6).toUpperCase();
  const timePart = Date.now().toString(36).slice(-2).toUpperCase();
  return `WDK-${timePart}${random}`;
}

// ========================
// POST: Tambah Tamu Manual
// ========================
router.post("/add-and-checkin", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Nama wajib diisi" });
    }

    const invitationId = req.user.invitation_id;
    const adminId = req.user.id;

    if (!invitationId) {
      return res
        .status(400)
        .json({ message: "Invitation tidak ditemukan di token" });
    }

    const code = generateUniqueCode(); // 🔥 generate code

    await db.query(
      `INSERT INTO guests 
       (name, invitation_id, admin_id, code, type, is_checked_in, checked_in_at)
       VALUES (?, ?, ?, ?, 'Tamu Tambahan', 1, NOW())`,
      [name, invitationId, adminId, code],
    );

    res.json({
      success: true,
      message: "Tamu berhasil ditambahkan & check-in",
      code: code, // optional kalau mau kirim ke FE
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
