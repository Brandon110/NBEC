const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumsSchema = new Schema({
    topic: String,
    title: String,
    body: String,
    author: { name: String, userId: String },
    datePosted: { type: Date, default: new Date() },
    editDate: Date,
    likes: [{ name: String, userId: String }],
    comments: [{
        name: String,
        userId: String, 
        text: String,
        date: { type: Date, default: new Date() },
        likes: [{ name: String, userId: String }]
    }]
});

const modelClass = mongoose.model('post', forumsSchema, 'posts');

module.exports = modelClass;