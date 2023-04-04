const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

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
            user.profilePicture = 'uploads/' + req.file.filename;
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