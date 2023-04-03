const userModel = require('../models/user-model');

const createUser = async (req, res) => {
    const userInfo = req.body;
    const user = new userModel({
        // first_name: userInfo.first_name,
        // last_name: userInfo.last_name,
        email: userInfo.email,
        // mobile: userInfo.mobile,
        // country: userInfo.country,
        password: userInfo.password,
        username: userInfo.username
        // role: userInfo.role
    });

   const result = await user.save();

   res.send(result);
}

const getUSerById = (req, res) => {
    const userId = req.params.userId;

    userModel.findById(userId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

const deleteUser = (req, res) => {
    const userId = req.params.userId;

    userModel.findByIdAndDelete(userId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

const updateUserInfo = (req, res) => {
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


module.exports = {createUser, deleteUser, getUSerById, updateUserInfo};
