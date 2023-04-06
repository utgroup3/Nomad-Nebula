

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

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3600000,
  },
  rolling: true,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


app.use(session(sess));

app.use(routes);

app.get('/check-session', (req, res) => {
  if (req.session && req.session.user_id) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on ${PORT}!`));
});