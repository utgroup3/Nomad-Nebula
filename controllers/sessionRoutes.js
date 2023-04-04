const router = require('express').Router();

router.get('/check-session', (req, res) => {
  if (req.session && req.session.user_id) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;