const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema ({
    name: {
        type : Schema.Types.String,
    }
});

const countryModel = mongoose.model('Country', countrySchema);

module.exports = countryModel;