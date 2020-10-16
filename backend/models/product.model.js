const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   description: {
       type: String
   },
   price: {
       type: String,
       required: true
   }
});

module.exports = mongoose.model('product', productSchema);