const mongoose = require('mongoose');

const quotesShema = new mongoose.Schema({
    item: {
        type: String,
        require
    },
    date: {
        type: Date,
        default: () => new Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to your User model
        required: true
      }
});

module.exports = mongoose.model('quote', quotesShema)