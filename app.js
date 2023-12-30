const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const { APP_PORT, SESSION_SECRET } = require('./src/config/env');
const router = require('./src/routers/index');
const passport = require('./src/helpers/passport');

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 3000000 * 60,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.listen(APP_PORT, () => {
  console.log('servise running at port ', APP_PORT);
});

module.exports = app;
