const express = require("express");
const multer = require("multer");
const router = express.Router();
const { createUndangan, getUndanganByCode } = require("../controllers/undanganController");

// 🔧 Upload konfigurasi
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📤 POST /api/undangan → Buat undangan baru
router.post("/", upload.array("images[]"), (req, res) => {
  const data = req.body;
  const images = req.files ? req.files.map((f) => f.originalname) : [];

  createUndangan(data, images, (err, result) => {
    if (err) {
      console.error("❌ Gagal buat undangan:", err);
      const message =
        err.message === "Admin sudah memiliki undangan"
          ? "Admin ini sudah memiliki undangan dan tidak bisa membuat baru."
          : err.message || "Gagal membuat undangan.";
      return res.status(400).json({ success: false, message });
    }

    res.json({
      success: true,
      message: "Undangan berhasil dibuat",
      result,
    });
  });
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
