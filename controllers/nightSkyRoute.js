const router = require('express').Router();
const sequelize = require('../config/connection')


router.get('/map-sky',  (req, res) => {
    res.render('map-sky', { loggedIn: true });
  });
  
router.get('/current-sky', (req, res) => {
    res.render('current-sky', { loggedIn: true });
  });

  module.exports = router;