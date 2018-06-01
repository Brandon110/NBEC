const nodemailer = require('nodemailer');
const _jade = require('jade');
const fs = require('fs');
const sendMail = require('./sendMail');
const forumsCollection = require('../models/forums');
const subscribersCollection = require('../models/subscribers');

const newsletter = () => {
    let template = process.cwd() + '/mail/views/newsletter.jade';

    fs.readFile(template, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        forumsCollection.find({}).sort({ _id: -1 }).limit(10).exec((err, threads) => {
            if (err) return err;

            let compiledTmpl = _jade.compile(data, { filename: template });
            let context = { threads: threads };
            let html = compiledTmpl(context);

            subscribersCollection.find({}, (err, subscribers) => {
                if (err) return err;

                const subject = 'NBEC - RECENT ACTIVITY';
                let mailingList = [];

                for (var i = 0; i < subscribers.length; i++) {
                    mailingList.push(subscribers[i].email);
                }

                sendMail(html, mailingList, subject);
            });
        });
    });
}

module.exports = newsletter;