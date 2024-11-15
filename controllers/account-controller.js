const { userModel } = require('../models/user-model');
const jwt = require('jsonwebtoken');



const handleError = (err) => {
    const error = {email: '', username: '', mobile: '', password: ''};
    const message = err._message; 
    console.log(message, err.code);
    
    if (err.code === 11000) {
        error.email = 'That email/username/mobile is allready registerd';
        return error;
    }

    if (message == 'User validation failed') {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }

    if (err.message == 'incorrect username') {
        error.username = "That username is incorrect"
    }

    if (err.message == 'incorrect password') {
        error.password = "That password is incorrect"
    }

    return error;
}


// login_signup =  (req, res) => {
//     res.render('account');
// }

module.exports.signup_get = (req, res) => {
    // req.headers.authorization = 
    res.render('signup');
}

const generate_JWT = ({ id, role }) => {
    
   return jwt.sign( { id, role }, "this is secret", { expiresIn: "2h" });
}

module.exports.createUser = async (req, res) => {
    const { username, password, email, mobile, birthDate, role } = req.body;
    console.log( username, password, email, mobile, birthDate, role );
    try {
        const user = new userModel({
            // first_name: userInfo.first_name,
            // last_name: userInfo.last_name,
            email: email,
            mobile: mobile,
            // country: userInfo.country,
            password: password,
            username: username,
            birthDate: birthDate,
            role: role
        });

        const user_ = await user.save();

        const token = generate_JWT({ id: user_._id, role: user_.role });
        res.cookie('jwt', token, {maxAge: 1000 * 60 * 60 * 2, httpOnly: true});

        console.log("user created", user_);
        res.status(201).send({ user: user_._id, token });
    }catch(err) {
        console.log(err);
        const error = handleError(err);
        res.status(400).json({ error });
    }
}


module.exports.displayUserProfile = (req, res) => {
    res.render('account');
}


module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);
    
    try {
        const user = await userModel.login(username, password);

        const token = generate_JWT({ id: user._id, role: user.role });
        res.cookie('jwt', token, {maxAge: 1000 * 60 * 60 * 2, httpOnly: true});


        // res.locals.name = user.username;
        res.status(200).send({ user: user._id, token });

    } catch(err) {
        console.log(err.message);
       const error = handleError(err);
       res.status(400).json({ error });
    }    

    
}

module.exports.getUSerById = (req, res) => {
    const userId = req.params.userId;

    userModel.findById(userId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports.deleteUser = (req, res) => {
    const userId = req.params.userId;

    userModel.findByIdAndDelete(userId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports.updateUserInfo = (req, res) => {
    const userId = req.params.userId;
    const userInfo = req.body;

    userModel.findByIdAndUpdate(userId, {
        email: userInfo.email,
        mobile: userInfo.mobile

    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

