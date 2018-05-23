const nodemailer = require('nodemailer');
const subscribersCollection = require('../models/subscribers');

module.exports = function (html) {
    subscribersCollection.find({}, (err, subscribers) => {
        if (err) return err;

        let mailingList = [];

        for (var i = 0; i < subscribers.length; i++) {
            mailingList.push(subscribers[i].email);
        }

        let transporter = nodemailer.createTransport({
            service: 'Hotmail',
            auth: {
                user: 'zilla.1234@hotmail.com',
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: 'zilla.1234@hotmail.com',
            to: mailingList,
            subject: 'NBEC - Recent activity',
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
} 