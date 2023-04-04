const express = require('express');
const router = express.Router();
const { editProfile } = require('../public/js/imageUpload');
const { ensureAuthenticated } = require('../utils/auth');

router.get('/edit-profile', ensureAuthenticated, (req, res) => {
  res.render('edit-profile', { user: req.user });
});

router.post('/edit-profile', ensureAuthenticated, editProfile);

module.exports = router;