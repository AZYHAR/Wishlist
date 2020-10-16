const mongoose = require('mongoose');
const { schema } = require('./user.model');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('wishlist', wishlistSchema);