const userSchema = require('../models/users');

module.exports = function (app, passport) {
    app.post('/activity/signin', (req, res, next) => {
        const email = req.body.email;
        const plainPassword = req.body.password;

        if (!email) {
            res.send({ status: 'error', msg: 'null email' });
        }
        else if (!plainPassword) {
            res.send({ status: 'error', msg: 'null password' })
        }
        else {
            passport.authenticate('local', (error, user, info) => {
                if (error) {
                    return res.status(500).json(error);
                }
                if (!user) {
                    return res.send({ status: 'error', msg: info.message });
                }
                req.logIn(user, (err) => {
                    if (err) return next(err);
                    return res.send({ status: 'success', msg: info.message, url: req.session.prevUrl });
                });
            })(req, res, next);
        }
    });
}
