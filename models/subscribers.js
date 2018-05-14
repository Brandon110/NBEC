const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    email: { type : String , unique : true, required : true, dropDups: true }
});

const modelClass = mongoose.model('subscriber', mailSchema, 'subscribers');

module.exports = modelClass;