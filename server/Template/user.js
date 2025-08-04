const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

userSheme.plugin(passportLocalMongoose);

module.exports = mongoose.model('user',userSheme)