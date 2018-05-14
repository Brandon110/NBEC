const userSchema = require('../models/users');
const validateEmail = require('../validators/validate_email');
const getTodaysDate = require('../helper_functions/getTodaysDate');
const uniqId = require('uniqid');

module.exports = function (app) {
    app.post('/activity/signup', (req, res) => {
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        const birthDate = req.body.birthDate;

        userSchema.findOne({ 'email': email }, (err, user) => {
            if (err) return err;

            if (!email) {
                return res.send({ status: 'error', msg: 'null email' })
            }
            else if (!validateEmail(email)) {
                return res.send({ status: 'error', msg: 'invalid email' })
            }
            else if (!firstName) {
                return res.send({ status: 'error', msg: 'null firstname' });
            }
            else if (!lastName) {
                return res.send({ status: 'error', msg: 'null lastname' });
            }
            else if (!birthDate) {
                return res.send({ status: 'error', msg: 'null brithdate' });
            }
            else if (!password) {
                return res.send({ status: 'error', msg: 'null password' });
            }
            else if (!confirm_password) {
                return res.send({ status: 'error', msg: 'null confirm password' });
            }
            else if (password !== confirm_password) {
                return res.send({ status: 'error', msg: 'non matching passwords' });
            }
            else if (user) {
                return res.send({ status: 'error', msg: 'email exists' });
            }
            else {
                const user = new userSchema({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    birthDate: birthDate,
                    userId: uniqId(),
                    dateJoined: getTodaysDate()
                });

                user.save(err => {
                    if (err) return err;
                    res.send({ status: 'success', msg: 'successful' });
                });
            }

        });
    });
}
