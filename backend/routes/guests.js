const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");
const QRCode = require("qrcode");
const xlsx = require("xlsx");
const fs = require ("fs");


const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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
      g.id,
      g.name,
      g.type,
      g.category,
      g.code,
      g.admin_id,
      g.invitation_id,
      g.souvenir,
      g.no_hp,
      g.is_checked_in,
      g.checked_in_at,

      i.groom_name,
      i.bride_name,
      i.wedding_date,
      i.location

    FROM guests g

    LEFT JOIN invitations i 
      ON g.invitation_id = i.id

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

router.post("/guests/import-xlsx", async (req, res) => {
  const { admin_id, guests } = req.body;

  if (!admin_id || !Array.isArray(guests) || guests.length === 0) {
    return res.status(400).json({ message: "Admin ID dan data tamu wajib diisi" });
  }

  try {
    // ambil invitation_id dari user
    const [userResult] = await db.query(
      "SELECT invitation_id FROM users WHERE id = ?",
      [admin_id]
    );

    if (userResult.length === 0 || !userResult[0].invitation_id) {
      return res.status(400).json({ message: "Admin belum memiliki undangan" });
    }

    const invitation_id = userResult[0].invitation_id;

    // validasi & bersihkan data
    const VALID_CATEGORY = ["VIP", "Reguler"];
    const VALID_TYPE = ["CPP", "CPW"];

    const cleanGuests = guests.map((g) => {
      const category = g.category?.trim() || "Reguler";
      const type = g.type?.trim().toUpperCase() || "CPP";

      return {
        name: g.name?.trim(),
        category: VALID_CATEGORY.includes(category) ? category : "Reguler",

        type: VALID_TYPE.includes(type) ? type : "CPP",

        souvenir: g.souvenir?.trim() || null,
        no_hp: g.no_hp?.toString().trim() || null,
      };
    });

    // siapkan data untuk insert
    const values = cleanGuests.map((g) => [
      g.name,
      g.category,
      g.type,
      generateUniqueCode(),
      admin_id,
      invitation_id,
      g.souvenir,
      g.no_hp,
    ]);

    await db.query(
      `
      INSERT INTO guests
      (
        name,
        category,
        type,
        code,
        admin_id,
        invitation_id,
        souvenir,
        no_hp
      )
      VALUES ?
      `,
      [values],
    );

    res.status(201).json({ message: "Import XLSX berhasil ✅" });
  } catch (err) {
    console.error("Gagal import XLSX:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat import XLSX" });
  }
});

// ========================
// POST: Tambah tamu baru (kode unik cepat + retry aman)
// ========================
router.post("/guests", async (req, res) => {
  const { name, type, category, admin_id, souvenir, no_hp } = req.body;

  if (!name || !type || !category || !admin_id) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  try {
    const [userResult] = await db.query(
      "SELECT invitation_id FROM users WHERE id = ?",
      [admin_id]
    );

    if (userResult.length === 0 || !userResult[0].invitation_id) {
      return res.status(400).json({ error: "Admin belum memiliki undangan" });
    }

    const invitation_id = userResult[0].invitation_id;
    let code = generateUniqueCode();

    try {
      const [result] = await db.query(
        `
        INSERT INTO guests
        (
          name,
          type,
          category,
          code,
          admin_id,
          invitation_id,
          souvenir,
          no_hp
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
              [
                name,
                type,
                category,
                code,
                admin_id,
                invitation_id,
                souvenir,
                no_hp,
              ],
            );

      return res.status(201).json({
        message: "Tamu berhasil ditambahkan dengan kode unik",
        id: result.insertId,
        name,
        type,
        category,
        code,
        souvenir,
        no_hp,
      });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        // Retry sekali
        code = generateUniqueCode();
        const [resultRetry] = await db.query(
          `
          INSERT INTO guests (name, type, category, code, admin_id, invitation_id, souvenir, no_hp)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            name,
            type,
            category,
            code,
            admin_id,
            invitation_id,
            souvenir || null,
            no_hp || null,
          ],
        );

        return res.status(201).json({
          message: "Tamu berhasil ditambahkan (retry duplikat) ✅",
          id: resultRetry.insertId,
          name,
          type,
          category,
          code,
          souvenir,
          no_hp,
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
router.get("/undangan/admin/:id", async (req, res) => {
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

// GET: Summary tamu berdasarkan adminId
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
// PUT: Edit tamu
// ========================
router.put("/guests/:id", async (req, res) => {
  const { id } = req.params;

  const {
    name,
    type,
    category,
    souvenir,
    no_hp,
  } = req.body;

  if (!name || !type || !category) {
    return res.status(400).json({
      error: "Nama, tipe, dan kategori wajib diisi",
    });
  }

  try {
    const [result] = await db.query(
      `
      UPDATE guests
      SET
        name = ?,
        type = ?,
        category = ?,
        souvenir = ?,
        no_hp = ?
      WHERE id = ?
      `,
      [
        name,
        type,
        category,
        souvenir || null,
        no_hp || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Data tamu tidak ditemukan",
      });
    }

    return res.json({
      message: "Data tamu berhasil diubah",
      id,
      name,
      type,
      category,
      souvenir: souvenir || null,
      no_hp: no_hp || null,
    });

  } catch (err) {
    console.error("Gagal edit tamu:", err);

    return res.status(500).json({
      error: "Gagal edit data tamu",
    });
  }
});

router.get("/rsvp/messages/:invitationId", async (req, res) => {
  const { invitationId } = req.params;

  try {
    const [rows] = await db.query(
      `
        SELECT
          id,
          name AS guest_name,
          rsvp_status,
          rsvp_message,
          rsvp_at
        FROM guests
        WHERE invitation_id = ?
          AND rsvp_message IS NOT NULL
          AND TRIM(rsvp_message) != ''
        ORDER BY rsvp_at DESC
        `,
      [invitationId],
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("GET RSVP messages error:", err);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil doa dan ucapan",
    });
  }
});

// =====================================================
// GET RSVP TAMU
// =====================================================
router.get("/rsvp/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        code,
        invitation_id,
        rsvp_status,
        rsvp_guest_count,
        rsvp_message,
        rsvp_at
      FROM guests
      WHERE code = ?
      LIMIT 1
      `,
      [code]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tamu tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error("GET RSVP error:", err);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data RSVP",
    });
  }
});


// =====================================================
// PUT / UPDATE RSVP TAMU
// =====================================================
router.put("/rsvp/:code", async (req, res) => {
  const { code } = req.params;
  const { status, message } = req.body;

  const allowedStatus = ["hadir", "tidak_hadir"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status RSVP tidak valid",
    });
  }

  try {
    const [guestRows] = await db.query(
      `
      SELECT
        id,
        name,
        invitation_id
      FROM guests
      WHERE code = ?
      LIMIT 1
      `,
      [code],
    );

    if (guestRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tamu tidak ditemukan",
      });
    }

    await db.query(
      `
      UPDATE guests
      SET
        rsvp_status = ?,
        rsvp_message = ?,
        rsvp_at = NOW()
      WHERE code = ?
      `,
      [status, message?.trim() || null, code],
    );

    return res.json({
      success: true,
      message: "Konfirmasi RSVP berhasil disimpan",
      data: {
        guest_name: guestRows[0].name,
        invitation_id: guestRows[0].invitation_id,
        rsvp_status: status,
        rsvp_message: message?.trim() || null,
      },
    });
  } catch (err) {
    console.error("PUT RSVP error:", err);

    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan RSVP",
    });
  }
});

module.exports = router;
