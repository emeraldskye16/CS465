const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');  // Correct import

// LocalStrategy tells Passport how to authenticate users.
passport.use(
    new LocalStrategy(
        { usernameField: 'email' },  // Use email instead of username
        async (email, password, done) => {
            try {
                // Look up user by email
                const user = await User.findOne({ email }).exec();

                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }

                // Validate password using model method
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                // Success — return user object
                return done(null, user);

            } catch (err) {
                return done(err);
            }
        }
    )
);
