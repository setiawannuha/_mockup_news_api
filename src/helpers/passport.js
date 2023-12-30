/* eslint-disable no-unused-expressions */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
  APP_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
} = require('../config/env');
const { sign } = require('../utils/jwt');

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${APP_URL}/api/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    const token = sign({ email: profile.emails });
    const user = {
      email: profile.emails[0].value,
      username: profile.displayName,
      id: profile.id,
      profileUrl: profile.photos[0].value,
      token,
    };
    done(null, user);
  },
));
passport.serializeUser((user, done) => {
  if (user) return done(null, user);
  return done(null, false);
});
passport.deserializeUser((user, done) => {
  if (user) return done(null, user);
  return done(null, false);
});

module.exports = passport;
