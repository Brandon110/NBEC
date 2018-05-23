const nodemailer = require('nodemailer');
const _jade = require('jade');
const fs = require('fs');
const sendMail = require('./nodemailer');
const forumsCollection = require('../models/forums');
 
const createMail = () => {
    let template = process.cwd() + '/mail/views/email.jade';

    fs.readFile(template, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        forumsCollection.find({}).sort({ 'date': -1 }).limit(10).exec((err, threads) => {
            if (err) return err;

            let compiledTmpl = _jade.compile(data, { filename: template });
            let context = { threads: threads };
            let html = compiledTmpl(context);

            sendMail(html)
        });
    });
}

module.exports = createMail;