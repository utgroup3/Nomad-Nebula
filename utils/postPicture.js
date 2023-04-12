const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: './public/uploads/postPicture/',
  // Set the filename of uploaded files
  filename: function (req, file, cb) {
    cb(null, file.fieldname + 'post-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  // Use the disk storage engine we just created
  storage: storage,
   // Set the maximum file size for uploaded files to 1 MB
  limits: { fileSize: 1000000 },
  // Filter uploaded files based on file type
  fileFilter: function (req, file, cb) {
    // Call checkFileType function to validate the file type
    checkFileType(file, cb);
  },
});

// Function to check the file type of uploaded files
function checkFileType(file, cb) {
  // Set the allowed file types
  const filetypes = /jpeg|jpg|png/;
   // Check the file extension against allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   // Check the file mimetype against allowed file types
  const mimetype = filetypes.test(file.mimetype);

  // If file is of an allowed file type, pass it on
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

module.exports = upload;