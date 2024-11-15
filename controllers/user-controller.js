const userModel = require('../models/user-model');
const { updateInfo } = require("../helpers/user-helper")
const jwt = require('jsonwebtoken');



const handleError = (err) => {
    const error = { email: '', username: '', mobile: '', password: '' };
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


module.exports.getUSerById = (req, res) => {
    const userId = req.params.userId;

    userModel.findById(userId).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: { "error": err.message } });
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
    try {

        const userId = req.params.userId;
        const user = req.body;

        updateInfo(userId, user);
        res.status(200).json()

    } catch (err) {

        console.log("error occured", err.message);
        res.status(500).json({ error: err.message });
    
    }
}

module.exports.render_users = (req, res) => {
    res.render('admin/user/users', 
    { 
        add : null, 
        title: "Users",
        action: "/users"
    
    });
}

module.exports.getAllUsers_get = async (req, res) => {

    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;
    const type = req.query.type || 'ADMIN';

    console.log('skip val is', skip, 'limit val is', limit);

    try {
        const users = await userModel.find({ role: type });//.sort({ _id: 1 }).limit(limit).skip(skip);

        res.locals = users;
        res.status(200).json(users);

    } catch (err) {

        res.locals = null;
        const error = { error: err.message };

        res.status(400).json({ error });
    }

}

module.exports.render_user_profile = (req, res) => {
    res.render('admin/user/user-profile');
}

module.exports.getUsersCount = async (req, res) => {

    try {
        const usersCount = await userModel.count();
        res.status(200).json({ usersCount });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: { error: err.message } })
    }


}

// module.exports = updateInfo;

// module.exports = { createUser, deleteUser, getUSerById, updateUserInfo, signup_get, login_post, login_get, displayUserProfile };
