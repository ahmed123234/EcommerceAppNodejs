const mongoose = require('mongoose');
const {isEmail, isMobilePhone, isStrongPassword} = require('validator');
const Schema = mongoose.Schema;
const regex = new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}');

const bcrypt  = require('bcrypt');
const userSchema = new Schema ({
    first_name: {
        type : Schema.Types.String
    },
    last_name: {
        type : String
    }, 
    username: {
         type: String,
         required: [true, "Please enter an username"],
         unique: true,
        //  validate: [(username) => { return /^(?=^[^_]+_?[^_]+$)\w{7,15}$/.test(username)}, 'Please enetr a valid username']
    },
    email: {
        type : String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [isEmail, 'Please enetr a valid email'],
        lowecase: true
    }, 
    mobile: {
        type: String,
        required: [true, "Please enter a mobile phone"],
        unique: true,
        validate: [isMobilePhone, 'Please enetr a valid mobile phone']
    
    },
    birthDate: {
        type: Schema.Types.Date
    },
    enabled: {
        type: Schema.Types.Boolean,
        default : false
    },
    password: {
        type: String,
        required: [true, 'Please enetr a password'],
        minLength: [6, 'The Minimum length of the password is 6'], 
        // validate: [isStrongPassword, "Please enter strong password"] 
    },
    role: {
        type: String,
        // enum: ['SELLER', 'ADMIN', 'CUSTOMER']
    }, 

    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    status: {
        type: String,
        default: "active"
    }, // active or inactive

    // bankDetails: BankDetails
});


// create hook before saving the user to db
userSchema.pre('save', async function(next) {
    
    console.log('before saving user in db', this);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    console.log('hashed password is: ', this.password);
    next();
});


userSchema.statics.login = async function(username, password) {
    
    const user = await this.findOne({ username });

    if (user) {
        // compare password using bcrypt 3rd party backage
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return user;
        } else {
            throw Error('incorrect password');    
        }
        
    } else {
        throw Error('incorrect username');
    }
}



const userModel = mongoose.model('User', userSchema);

module.exports = { userModel, userSchema };

