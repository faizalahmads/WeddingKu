const db = require("../db");

// 🧠 Fungsi untuk membuat undangan baru
const createUndangan = (data, images, callback) => {
  // 🔹 1. Cek apakah admin sudah punya undangan
  const checkUser = "SELECT invitation_id FROM users WHERE id = ?";
  db.query(checkUser, [data.admin_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("❌ Gagal cek admin:", checkErr);
      return callback(checkErr);
    }

    if (checkResult.length === 0) {
      return callback({ message: "Admin tidak ditemukan" });
    }

    if (checkResult[0].invitation_id) {
      return callback({ message: "Admin sudah memiliki undangan" });
    }

    // 🔹 2. Jika belum punya undangan → buat undangan baru
    const query = `
      INSERT INTO invitations 
      (title, groom_name, bride_name, wedding_date, location, maps_link, description, theme_id, gallery_images, code, unique_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const gallery = JSON.stringify(images || []);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const unique_code = Date.now().toString(36).toUpperCase();

    db.query(
      query,
      [
        data.title || null,
        data.groom_name,
        data.bride_name,
        data.wedding_date,
        data.location,
        data.maps_link,
        data.description,
        data.theme_id || 1, // fallback tema default
        gallery,
        code,
        unique_code,
      ],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("❌ Error saat insert:", insertErr);
          return callback(insertErr);
        }

        const invitationId = insertResult.insertId;

        // 🔹 3. Update tabel users agar terhubung dengan undangan ini
        const updateUser = "UPDATE users SET invitation_id = ? WHERE id = ?";
        db.query(updateUser, [invitationId, data.admin_id], (updateErr) => {
          if (updateErr) {
            console.error("❌ Error saat update user:", updateErr);
            return callback(updateErr);
          }

          console.log(`✅ Undangan baru berhasil dibuat untuk admin ID ${data.admin_id}`);
          callback(null, { id: invitationId, code });
        });
      }
    );
  });
};

// 🧩 Fungsi untuk mengambil undangan berdasarkan kode
const getUndanganByCode = (code, callback) => {
  db.query("SELECT * FROM invitations WHERE code = ?", [code], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = { createUndangan, getUndanganByCode };
