const validateImgUrl = require('../validators/validate_img_url');
const userCollection = require('../models/users');
const forumCollection = require('../models/forums');

module.exports = function (app) {
    app.post('/activity/update-profile', (req, res) => {
        let profileImg = req.body.profileImg;
        let birthDate = req.body.birthDate;
        let goal = req.body.goal;

        let data = {};

        if (profileImg) data.profileImg = profileImg;
        if (birthDate) data.birthDate = birthDate;
        if (goal) data.goal = goal;

        if (data.profileImg && !validateImgUrl(data.profileImg)) {
            return res.send({ status: 'error', msg: 'invalid img' })
        }

        userCollection.findOneAndUpdate({ 'userId': req.user }, { $set: data }, { new: true }, (err, updated) => {
            if (err) return err;

            return res.send({ status: 'success', msg: 'successful' });
        });
    });

    app.post('/activity/remove-profile-img', (req, res) => {
        const email = req.body.email;

        userCollection.findOneAndUpdate({ 'email': email }, {
            $set: {
                profileImg: 'http://i49.photobucket.com/albums/f254/gboyyy1/avatar-1577909_640_zpsinwnkk0p.png'
            }
        }, { new: true }, (err, updated) => {
            if (err) return err;
            return res.send({ status: 'success', msg: 'successful' });
        });
    });

    app.post('/activity/change-password', (req, res) => {
        const password = req.body.password;
        const newPassword = req.body.newPassword;

        if (!password) {
            return res.send({ status: 'error', msg: 'null password' });
        }
        else if (!newPassword) {
            return res.send({ status: 'error', msg: 'null new password' });
        }
        else {
            userCollection.findOne({ 'userId': req.user }, (err, user) => {
                if (err) return err;

                user.comparePassword(password, function (err, isMatch) {
                    if (err) return err;

                    if (!isMatch) {
                        return res.send({ status: 'error', msg: 'incorrect password' })
                    }

                    const data = user;

                    data.password = newPassword;

                    data.save(err => {
                        if (err) return err;
                        return res.send({ status: 'success', msg: 'successful' });
                    });
                });
            });
        }
    });

    app.post('/activity/deactivate-account', (req, res) => {
        const email = req.body.email;

        userCollection.findOne({ 'email': email }, (err, user) => {
            if (err) return err;

            if (!user) {
                return false;
            }
            else {
                userCollection.remove({ 'email': email }, (err, results) => {
                    if (err) return err;
                    req.session.destroy(err => {
                        if (err) return err;
                        return res.send({ status: 'success', msg: 'successful' });
                    });
                });
            }
        });
    });

    app.get('/profile/live/:userId', (req, res) => {
        const userId = req.params.userId;

        userCollection.findOne({ 'userId': userId }, (err, user) => {
            if (err) return err;
            if (!user) return res.send({ status: 'error' });

            let data = {};

            data.firstName = user.firstName;
            data.lastName = user.lastName;
            data.email = user.email;
            data.birthDate = user.birthDate;
            data.profileImg = user.profileImg;
            data.dateJoined = user.dateJoined;
            data.activity = user.activity;
            data.goal = user.goal;
            data.userId = user.userId;
            data.fullName = user.firstName + ' ' + user.lastName;

            forumCollection.find({ 'author.userId': user.userId }, (err, posts) => {
                if (err) return err;

                data.posts = posts;

                return res.send(data);
            });
        });
    });

    app.post('/activity/remove-activity', (req, res) => {
        const id = req.body.id;

        userCollection.findOneAndUpdate({ 'userId': req.user },
            {
                $pull: {
                    'activity': {
                        '_id': id
                    }
                }
            }, { new: true },
            (err, updated) => {
                if (err) return err;
                res.send({ status: 'success' });
            });
    });
}
