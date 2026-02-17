const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + crypto.randomBytes(6).toString("hex");

    const prefix = file.fieldname === "images" ? "gallery" : file.fieldname;

    cb(null, uniqueSuffix + "-" + prefix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
