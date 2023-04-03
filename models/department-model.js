const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema ({
    departmentName: {
        type : Schema.Types.String
    }, 
    contactEmail : {
        type: String
    }
});

const departmentModel = mongoose.model('Department', departmentSchema);

module.exports = departmentModel;