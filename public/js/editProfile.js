const upload = require('./imageUpload');
const { User } = require('../../models');

function editProfile(req, res) {
  upload.single('profilePicture')(req, res, (err) => {
    if (err) {
      req.flash('error_msg', 'Error uploading file: ' + err);
      res.redirect('/edit-profile');
    } else {
      const { username, location, birthday } = req.body;
      const profilePicture = req.file ? req.file.filename : req.user.profilePicture;
      User.update(
        {
          username,
          location,
          birthday,
          profilePicture
        },
        {
          where: { id: req.user.id }
        }
      )
        .then(() => {
          req.flash('success_msg', 'Profile updated successfully');
          res.redirect('/profile');
        })
        .catch((err) => {
          req.flash('error_msg', 'Error updating profile: ' + err);
          res.redirect('/edit-profile');
        });
    }
});
}

module.exports = editProfile;
