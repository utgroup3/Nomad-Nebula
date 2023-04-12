const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {

  // Query the database for user data
  User.findOne({
    attributes: [
      'id',
      'username',
      'birthday',
      'location',
      'profilePicture',
    ],
    where: {
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
      // Extract the user data and render the horoscope view
      const user = dbUserData.get({ plain: true });
      res.render('horoscope', {
        user,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;