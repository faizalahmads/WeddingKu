const db = require("../db");

const createUndangan = (data, images, callback) => {
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
        data.theme_id,
        gallery,
        code,
        unique_code
    ],
    (err, results) => {
      if (err) return callback(err);
      callback(null, { id: results.insertId, code });
    }
  );
};

const getUndanganByCode = (code, callback) => {
  db.query("SELECT * FROM invitations WHERE code = ?", [code], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = { createUndangan, getUndanganByCode };