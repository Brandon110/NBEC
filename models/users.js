const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: {type: String, hide: true},
   birthDate: String,
   profileImg: {type: String, default: 'http://i49.photobucket.com/albums/f254/gboyyy1/avatar-1577909_640_zpsinwnkk0p.png' },
   goal: String,
   dateJoined: String,
   userId: String,
   activity: [{ action: String, url: String, title: String, date: String  }]
});

userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.plugin(mongooseHidden); 

const modelClass = mongoose.model('user', userSchema, 'users');

module.exports = modelClass;