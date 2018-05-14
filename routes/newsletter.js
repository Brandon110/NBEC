const subscriberCollection = require('../models/subscribers');
const validateEmail = require('../validators/validate_email');

module.exports = function (app) {
    app.post('/activity/subscribe', (req, res) => {
        const email = req.body.email;

        if (!email) {
            return res.send({ status: 'error', msg: 'null email' });
        }
        else if (!validateEmail(email)) {
            return res.send({ status: 'error', msg: 'invalid email' });
        }
        else {
            let subscriber = new subscriberCollection({
                email: email
            });

            subscriber.save(err => {
                if (err) return res.send({ status: 'error', msg: 'email exists' });
                return res.send({ status: 'success', msg: 'successful' });
            });
        }
    });
}
