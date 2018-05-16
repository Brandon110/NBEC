const forumsCollection = require('../models/forums');
const getTodaysDate = require('../helper_functions/getTodaysDate');
const userCollection = require('../models/users');
const activity = require('../activity/index');

module.exports = function (app) {
    app.get('/posts/:topic', (req, res) => {
        forumsCollection.find({ topic: req.params.topic }, (err, posts) => {
            if (err) return err;

            res.send(posts);
        });
    });

    app.post('/activity/create-thread', (req, res) => {
        const title = req.body.title;
        const body = req.body.body;
        const topic = req.body.topic;

        if (!title) {
            res.send({ status: 'error', msg: 'null title' });
        }
        else if (!body) {
            res.send({ status: 'error', msg: 'null body' });
        }
        else if (title.length > 30) {
            res.send({ status: 'error', msg: 'exceeded character length' });
        }
        else {
            userCollection.findOne({ 'userId': req.user }, (err, user) => {
                if (err) return err;

                let thread = new forumsCollection({
                    topic: topic,
                    title: title,
                    body: body,
                    author: { firstName: user.firstName, userId: user.userId },
                    datePosted: getTodaysDate(),
                });

                thread.save(err => {
                    if (err) return err;
                    const title = thread.title;
                    const url = '/forums/' + thread.topic + '/' + thread._id;
                    const action = 'Posted thread';
                    activity(title, url, action, req, app.io);

                    res.send({ status: 'success', msg: 'successful', id: thread._id });
                });
            });
        }
    });

    app.post('/activity/edit-thread', (req, res) => {
        const thread = req.body.thread;

        forumsCollection.findOneAndUpdate({ '_id': thread._id },
            { $set: { 'body': thread.body, editDate: getTodaysDate() } }, { new: true }, (err, updated) => {
                if (err) return err;

                res.send({ status: 'success', id: thread._id });
            });
    });

    app.get('/thread/:id', (req, res) => {
        forumsCollection.findOne({ '_id': req.params.id }, (err, thread) => {
            if (err) return res.send({ status: 'error' });

            res.send(thread);
        });
    });

    app.post('/activity/add-thread-comment', (req, res) => {
        const threadId = req.body.threadId;
        const comment = req.body.comment;

        if (!comment) {
            res.send({ status: 'error', msg: 'null comment' })
        }
        else {
            userCollection.findOne({ 'userId': req.user }, (err, user) => {
                if (err) return err;

                forumsCollection.findOne({ '_id': threadId }, (err, thread) => {
                    if (err) return err;

                    let obj = {};

                    obj.userId = req.user;
                    obj.name = user.firstName + ' ' + user.lastName;
                    obj.text = comment;
                    obj.date = getTodaysDate();
                
                    thread.comments.unshift(obj);

                    thread.save(err => {
                        if (err) return err;

                        return res.send({ status: 'success', msg: 'successful' });
                    });
                });
            });
        }
    });
}
