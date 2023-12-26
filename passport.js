const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Admin = require('./models/admin');

passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
        try {
          const user = await Admin.findOne({ username: username });

          if (!user) {
            return done(null, false, { message: "Incorrect username" });
          };
          
          const match = await bcrypt.compare(password, user.password);

          console.log(match)
          if (!match) {
            return done(null, false, { message: "Incorrect password" });
          };

          return done(null, user);
        } catch(err) {
          return done(err);
        };
    })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

module.exports = passport;
