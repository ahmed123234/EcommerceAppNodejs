const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    name: {
        type : Schema.Types.String,
    },
    description: {
        type : Schema.Types.String,
    },
    dailyProduct: {
        type : Schema.Types.Boolean
    }, 
    status: {
        type : Schema.Types.Boolean
    }, 
    image: {
        type : Schema.Types.String
    },
    nameMalayma : String,
    favoriteStatus: Boolean
});

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;