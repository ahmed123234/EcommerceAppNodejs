const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    name: {
        type : Schema.Types.String,
    },
    description: {
        type : Schema.Types.String,
    },
    dailyProducts: {
        type : Schema.Types.Boolean
    }, 
    status: {
        type : Schema.Types.Boolean
    }, 
    image: {
        type : Schema.Types.String
    }
});

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;