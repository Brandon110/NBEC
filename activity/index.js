const mongoose = require('mongoose');
const getTodaysDate = require('../helper_functions/getTodaysDate');
const userCollection = require('../models/users');

function activity(title, url, action, req, io) {
    userCollection.findOneAndUpdate({ 'userId': req.user }, 
    {$push: { 'activity': { title, url, action, date: getTodaysDate() } }}, {new: true}, (err, updated) => {
       if(err) return err;
    });
}

module.exports = activity;