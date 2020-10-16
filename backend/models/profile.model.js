const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('profile', profileSchema);