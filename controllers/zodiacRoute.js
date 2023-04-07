const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {

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
    // const users = dbUserData.map(user => user.get({ plain: true }));
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