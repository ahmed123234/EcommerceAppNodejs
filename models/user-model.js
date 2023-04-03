const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    first_name: {
        type : Schema.Types.String
    },
    last_name: {
        type : String
    }, 
    username: {
         type: String
    },
    email: {
        type : String
    }, 
    mobile: {
        type: String
    },
    enabled: {
        type: Schema.Types.Boolean,
        default : false
    },
    password: {
        type: String
    },
    role: {
        type: String
    }, 
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;