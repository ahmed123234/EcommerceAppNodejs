const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    // frontPicture : String,
    // backPicture: String,
    // rightSidePicture: String,
    // lefttSidePicture: String
    images: [String],
});

const ImageModel = mongoose.model('Descriptive_Image', ImageSchema);

module.exports = {ImageSchema, ImageModel};

