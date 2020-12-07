const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        required: true
    },
    trackingNumber: {
        type: String,
        required: true
    },
    orderBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('order', orderSchema);