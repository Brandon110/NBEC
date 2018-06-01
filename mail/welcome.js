const _jade = require('jade');
const fs = require('fs');
const sendMail = require('./sendMail');

const welcome = (email) => {
    let template = process.cwd() + '/mail/views/welcome.jade';

    fs.readFile(template, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        let compiledTmpl = _jade.compile(data, { filename: template });
        let context = { title: 'Thank you for subscribing to our newsletter!' };
        let html = compiledTmpl(context);

        const subject = 'Welcome to our newsletter!';
       
        sendMail(html, email, subject);
    });
}

module.exports = welcome;