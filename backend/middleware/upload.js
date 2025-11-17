const multer = require("multer");
const path = require("path");

// Lokasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder uploads/
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext); 
    // contoh: 1732003044210-groom_img.png
  }
});

// Validasi file hanya image JPG/PNG/JPEG
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Hanya boleh upload gambar JPG/PNG"), false);
  } else {
    cb(null, true);
  }
};

// Limit ukuran maksimal 3MB
const limits = {
  fileSize: 10 * 1024 * 1024 // 3MB
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
