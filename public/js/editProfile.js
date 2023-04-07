const form = document.querySelector('.edit-profile-form form');

if (form) {
  form.onsubmit = function(event) {
    event.preventDefault();

    let data = new FormData(form);
    let object = {};
    data.forEach((value, key) => {
      object[key] = value;
    })

    fetch("api/users/edit-profile", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(object)
    })
    .then(response => {
      if (response.status === 203) {
        window.open('/profile', '_self')
      }
    })
  }
}

// const upload = require('./imageUpload');
// const { User } = require('../../models');

// function editProfile(req, res) {
//   upload.single('profilePicture')(req, res, (err) => {
//     if (err) {
//       req.flash('error_msg', 'Error uploading file: ' + err);
//       res.redirect('/edit-profile');
//     } else {
//       const { username, location, birthday } = req.body;
//       const profilePicture = req.file ? req.file.filename : req.user.profilePicture;
//       User.update(
//         {
//           username,
//           location,
//           birthday,
//           profilePicture
//         },
//         {
//           where: { id: req.user.id }
//         }
//       )
//         .then(() => {
//           req.flash('success_msg', 'Profile updated successfully');
//           res.redirect('/profile');
//         })
//         .catch((err) => {
//           req.flash('error_msg', 'Error updating profile: ' + err);
//           res.redirect('/edit-profile');
//         });
//     }
//   });
// }

// module.exports = editProfile;