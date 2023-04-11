const router = require('express').Router();
// Importing the User model
const { User } = require('../models');
const sequelize = require('../config/connection')

// Handling GET request for '/map-sky' route
router.get('/map-sky', async (req, res) => {
  try {
    // Finding the user with the specified id from session
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
        'profilePicture'
      ],
    });

    // Extracting plain data from the returned Sequelize model
    const user = dbUserData.get({ plain: true });

     // Rendering the 'map-sky' template with user data and 'loggedIn' status as true
    res.render('map-sky', {
      user,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Handling GET request for '/current-sky' route
router.get('/current-sky', async (req, res) => {
  try {
    // Finding the user with the specified id from session
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
        'profilePicture'
      ],
    });

    // Extracting plain data from the returned Sequelize model
    const user = dbUserData.get({ plain: true });

    // Rendering the 'current-sky' template with user data and 'loggedIn' status as true
    res.render('current-sky', {
      user,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;