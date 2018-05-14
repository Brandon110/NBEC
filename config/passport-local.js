const LocalStrategy = require('passport-local').Strategy;
const userCollection = require('../models/users');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
    },
        function (username, password, done) {
            userCollection.findOne({ 'email': username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'incorrect email or password' }); }
                user.comparePassword(password, function (err, isMatch) {
                    if (err) return done(err);
                    if (!isMatch) { return done(null, false, { message: 'incorrect email or password' }); }
                    return done(null, user, { message: 'successful' });
                });
            });
        }
    ));
}