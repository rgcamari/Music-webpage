const multer = require('multer');
const path = require('path');

// Image Upload
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// MP3 Upload
const songStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/songs');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadSong = multer({ storage: songStorage });

module.exports = { uploadImage, uploadSong };
