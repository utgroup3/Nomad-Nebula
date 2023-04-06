const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const sessionRoutes = require('./sessionRoutes');

const zodiacRoute = require('./zodiac-route')


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/session', sessionRoutes);

router.use('/zodiac', zodiacRoute);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;