const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const { profileUpload, resizeAndSaveProfilePicture } = require('../../utils/profilePicture.js');

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
    password: req.body.password,
    location: req.body.location,
    birthday: req.body.birthday
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.birthday = dbUserData.birthday;
        req.session.location = dbUserData.location;
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
        req.session.birthday = dbUserData.birthday;
        req.session.location = dbUserData.location;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

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
router.post('/edit-profile', withAuth, profileUpload.single('profilePicture'), async (req, res) => {
  let {username, location, birthday} = req.body;
  let profilePicture;

  if (req.file) {
    try {
      const resizedImage = await resizeAndSaveProfilePicture(req.file);
      profilePicture = 'https://the-nomad-nebula.herokuapp.com/uploads/profilePicture/' + resizedImage.filename;
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error resizing the image");
    }
  }

  User.update(
    {
      username,
      location,
      birthday,
      profilePicture
    },
    {
      where: { id: req.session.user_id }
    }
  )
    .then((dbUserData) => {
      req.session.username = dbUserData.username;
      req.session.birthday = dbUserData.birthday;
      req.session.location = dbUserData.location;
      res.sendStatus(203);
    })
    .catch((err) => {
      res.redirect('/edit-profile');
    });
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