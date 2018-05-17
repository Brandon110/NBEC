const userCollection = require('../models/users');

const addActivity = (action, url, title, date, req) => {
    userCollection.findOne({ 'userId': req.user }, (err, user) => {
        if (err) return err;

        let newActivity = {};

        newActivity.action = action;
        newActivity.url = url;
        newActivity.title = title;
        newActivity.date = date;
        
        user.activity.unshift(newActivity);

        user.save(err => {
            if (err) return err;
        });
    });
}

module.exports = addActivity;