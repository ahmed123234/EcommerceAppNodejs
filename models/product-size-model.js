const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSizeSchema = new Schema({
    size: {
        type: Number
    },
    unit: {
        type: String
    },
    name: {
        type: String,
        unique: true
    },
    stockValue: {
        type: Number
    }, 
    type: {
        type: Schema.Types.String
    }
});


module.exports.productSizeModel = mongoose.model('ProductSize', productSizeSchema);
