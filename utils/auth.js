const withAuth = (req, res, next) => {
  // If user is not logged in, redirect to login page
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;