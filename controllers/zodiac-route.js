const router = require('express').Router();
const User = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {

  User.findAll({
    attributes: [
      'id',
      'username',
      'birthday'
    ],
  })
  .then(dbUserData => {
    const users = dbUserData.map(user => user.get({ plain: true }));
    res.render('horoscope', { 
      users, 
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });


});

module.exports = router;