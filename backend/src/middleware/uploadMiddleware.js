const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const storage =
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "civicai-issues",
      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],
    },
  });

const upload = multer({
  storage,
});

module.exports = upload;