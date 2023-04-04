const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const storage = multer.memoryStorage(); 

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profilePicture');

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

  exports.editProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      upload(req, res, async (err) => {
        if (err) {
          res.render('edit-profile', { msg: err });
        } else {
          user.username = req.body.username;
          user.location = req.body.location;
          user.birthday = req.body.birthday;
  
          if (req.file) {
            const processedImageBuffer = await sharp(req.file.buffer)
              .resize(200, 200) // Set desired dimensions
              .png()
              .toBuffer();
            const filename = `profilePicture-${Date.now()}.png`; // Generate a unique filename
            await fs.promises.writeFile(`./public/uploads/${filename}`, processedImageBuffer);
            user.profilePicture = `uploads/${filename}`;
          }
  
          await user.save();
          res.redirect('/profile');
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};