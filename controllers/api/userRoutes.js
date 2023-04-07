const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const { profilePicture, uploadProfilePicture, } = require('../../public/js/imageUpload');

// // GET all users
// router.get('/community', (req, res) => {
//   User.findAll({})
//     .then(dbUserData => res.json(dbUserData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// GET a single user by ID
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    // email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    birthday: req.body.birthday
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// LOGIN a user
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// // LOGOUT a user
// router.get('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy()
//     //   () => {
//     //   res.status(204).end();
//     // });
//   }
//     res.render('landing-page', {
//       loggedIn: false,
//     });
//   // } else {
//   //   res.status(404).end();
//   // }
// });

// UPDATE a user by ID
router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET the edit-profile page
router.get('/edit-profile', withAuth, (req, res) => {
  res.render('edit-profile', { user: req.user });
});

// POST request for updating the profile
router.post('/edit-profile', withAuth, profilePicture, uploadProfilePicture, async (req, res) => {
  try {
    const { username, location, birthday } = req.body;
    const profilePicture = req.file ? req.file.path.replace('public', '') : req.user.profilePicture;
    
    await User.update(
      {
        username,
        location,
        birthday,
        profilePicture
      },
      {
        where: { id: req.user.id }
      }
    );
    
    res.redirect('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a user by ID
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;