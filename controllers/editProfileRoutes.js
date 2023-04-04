const express = require('express');
const router = express.Router();
const profileController = require('./profileController');
const { ensureAuthenticated } = require('../config/auth');

router.get('/edit-profile', ensureAuthenticated, (req, res) => {
  res.render('edit-profile', { user: req.user });
});

router.post('/edit-profile', ensureAuthenticated, profileController.editProfile);

module.exports = router;