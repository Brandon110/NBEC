const subscriberCollection = require('../models/subscribers');
const userCollection = require('../models/users');
const welcomeEmail = require('../mail/welcome');

module.exports = function (app) {
    app.get('/activity/subscribe', (req, res) => {
        userCollection.findOne({ 'userId': req.user }, (err, user) => {
            if (user === null) {
                req.session.prevUrl = '/newsletter';
                res.send({ status: 'error', msg: 'null user' });
            }
            else {
                let subscriber = new subscriberCollection({
                    email: user.email
                });

                subscriber.save(err => {
                    if (err) return res.send({ status: 'error', msg: 'email exists' });

                    welcomeEmail(user.email);

                    return res.send({ status: 'success', msg: 'successful' });
                });
            }
        });
    });

    app.get('/activity/unsescribe', (req, res) => {
        userCollection.findOne({ 'userId': req.user }, (err, user) => {
            if (err) return err;

            if (user) {
                subscriberCollection.remove({ 'email': user.email }, (err, results) => {
                    if (err) return err;
                    res.send('Successfully unsescribed from our newsletter')
                });
            }
            else {
                req.session.prevUrl = '/activity/unsescribe';
                res.redirect('/signin');
            }
        });
    });
}
