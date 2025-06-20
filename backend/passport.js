// passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config(); // Load env vars here too if needed

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,          // ✅ Must not be undefined
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // ✅ Must not be undefined
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // You can replace this with your DB logic
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
