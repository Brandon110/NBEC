const userCollection = require('../models/users');
const forumsCollection = require('../models/forums');

module.exports = function (app) {
    app.get('/user', (req, res) => {
        userCollection.findOne({ 'userId': req.user }, (err, user) => {
            if (err) return err;

            let userData = null;

            if (user) {
                userData = {};

                userData._id = user._id;
                userData.firstName = user.firstName;
                userData.lastName = user.lastName;
                userData.email = user.email;
                userData.birthDate = user.birthDate;
                userData.profileImg = user.profileImg;
                userData.goal = user.goal;
                userData.dateJoined = user.dateJoined;
                userData.activity = user.activity;
                userData.userId = user.userId;
            }

            return res.send(userData);
        });
    });

    app.get('/user/posts', (req, res) => {
        forumsCollection.find({ 'author.userId': req.user }, (err, posts) => {
            if (err) return err;

            return res.send(posts);
        });
    });
}
