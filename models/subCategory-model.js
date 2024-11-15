const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema ({
    name: {
        type : Schema.Types.String,
    },
    description: {
        type : Schema.Types.String,
    }, 
    category: {
        type : Schema.Types.ObjectId,
        ref: 'Category'
    }, 
    image: {
        type : Schema.Types.String
    },
    status: {
        type: Schema.Types.Boolean
    },
    favoriteStatus: {
        type: Schema.Types.Boolean
    }
});

const subCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = subCategoryModel;