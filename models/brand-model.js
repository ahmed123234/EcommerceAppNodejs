const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: Schema.Types.String
    },

    description: {
        type: Schema.Types.String
    },
    logo: {
        type: Schema.Types.String
    }
});


module.exports.brandModel = mongoose.model('brand', brandSchema);