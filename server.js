const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;


// Session configuration
const sess = {
  // Secret key used for session data encryption
  secret: 'Super secret secret', 
  cookie: {
    maxAge: 3600000,
  },
  // Refresh cookie on each request
  rolling: true,
   // Do not save the session if nothing is modified
  resave: false,
  // Save an uninitialized session (one with no data)
  saveUninitialized: true,
   // Store the session data in a Sequelize database
  store: new SequelizeStore({
    db: sequelize
  })
};

 // Create a Handlebars instance with helper functions
const hbs = exphbs.create({ helpers });

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.use(session(sess));

app.use(routes);

app.get('/check-session', (req, res) => {
  // Check if the user is logged in by checking the session data
  if (req.session && req.session.user_id) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Sync the Sequelize models with the database and start listening on the specified port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on ${PORT}!`));
});