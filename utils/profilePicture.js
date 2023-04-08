const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const storage = multer.diskStorage({
  destination: './public/uploads/profilePicture/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + 'profile-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Resizing Profile Image
const resizeAndSaveProfilePicture = async (file) => {
  try {
    const resizedImageBuffer = await sharp(file.path)
      .resize(500, 500)
      .toBuffer();

    await sharp(resizedImageBuffer).toFile(file.path);

    return file;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to process image');
  }
};

module.exports = { profileUpload: upload, resizeAndSaveProfilePicture };