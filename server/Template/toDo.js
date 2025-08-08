const mongoose = require('mongoose');

const todoShema = new mongoose.Schema({
    item: {
        type: String,
        require
    },
    date: {
        type: Date,
        default: () => new Date()
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to your User model
        required: true
      }
});

module.exports = mongoose.model('to-do', todoShema)