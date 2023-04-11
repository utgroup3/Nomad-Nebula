const router = require('express').Router();

// Define a route for checking the user's session status
router.get('/check-session', (req, res) => {
   // Check if a session exists and if it contains a user_id property
  if (req.session && req.session.user_id) {
    // If a session and user_id exists, send a JSON response with the property "loggedIn" set to true
    res.json({ loggedIn: true });
  } else {
    // If no session or user_id exists, send a JSON response with the property "loggedIn" set to false
    res.json({ loggedIn: false });
  }
});

module.exports = router;