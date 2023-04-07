const router = require('express').Router();
const { User } = require('../models');
const sequelize = require('../config/connection');

router.get('/map-sky', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render('map-sky', {
      loggedIn: true,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/current-sky', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render('current-sky', {
      loggedIn: true,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;