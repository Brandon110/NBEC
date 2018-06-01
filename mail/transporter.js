const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: 'zilla.1234@hotmail.com',
        pass: process.env.EMAIL_PASS
    }
});

module.exports  = transporter;