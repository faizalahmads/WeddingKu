const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads";

    if (file.fieldname === "images") {
      folder = "uploads/gallery";
    } else if (
      file.fieldname === "groom_img" ||
      file.fieldname === "bride_img" ||
      file.fieldname ===  "logo_img" ||
      file.fieldname ===   "cover_mobile_img" ||
      file.fieldname ===   "cover_desktop_img"
    ) {
      folder = "uploads/invitations";
    } else if (file.fieldname.startsWith("story_images")) {
      folder = "uploads/stories";
    }

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + crypto.randomBytes(6).toString("hex");

    cb(
      null,
      uniqueSuffix + "-" + file.fieldname + path.extname(file.originalname),
    );
  },
});

module.exports = multer({ storage });
