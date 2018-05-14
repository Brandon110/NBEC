const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumsSchema = new Schema({
    topic: String,
    title: String,
    body: String,
    author: { firstName: String, userId: String },
    datePosted: String,
    editDate: String,
    likes: Array,
    comments: [{
        name: String,
        text: String,
        date: String,
        likes: Array
    }]
});

const modelClass = mongoose.model('post', forumsSchema, 'posts');

module.exports = modelClass;