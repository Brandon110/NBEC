const transporter = require('./transporter');

module.exports = function (html, mailingList, subject) {
        let mailOptions = {
            from: 'zilla.1234@hotmail.com',
            to: mailingList,
            subject: subject,
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
} 