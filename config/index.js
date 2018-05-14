const userCollection = require('../models/users');

module.exports = function (passport) {

    require('./passport-local')(passport);

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        userCollection.findById(id, function (err, user) {
            done(err, user.userId);
        });
    });
}