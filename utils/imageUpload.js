const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

// Multer storage configuration
const multerStorage = multer.memoryStorage();

// Multer file filter configuration
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Multer instance
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware to resize and save profile pictures
const uploadProfilePicture = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `profilePicture-${req.user.id}-${Date.now()}.jpeg`;
  const outputPath = path.join('public', 'uploads', 'profile', filename);

  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    req.file.filename = filename;
    req.file.path = outputPath;
    next();
  } catch (err) {
    console.error('Error while resizing image:', err);
    return res.status(500).json({ message: 'Error while resizing image.' });
  }
};

// Middleware to resize and save post images
const uploadPostImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `postImage-${Date.now()}.jpeg`;
  const outputPath = path.join('public', 'uploads', 'imgPosts', filename);

  try {
    await sharp(req.file.buffer)
      .resize(1024, 1024, { fit: 'inside' })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    req.file.filename = filename;
    req.file.path = outputPath;
    next();
  } catch (err) {
    console.error('Error while resizing image:', err);
    return res.status(500).json({ message: 'Error while resizing image.' });
  }
};

module.exports = {
  profilePicture: upload.single('profilePicture'),
  uploadProfilePicture,
  postImage: upload.single('image'),
  uploadPostImage,
};