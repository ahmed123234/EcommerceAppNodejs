const { userModel } = require('../models/user-model');

module.exports.updateInfo = async (userId, user) => {
    try {
        const res = await userModel.findByIdAndUpdate(userId, {
            email: user.email,
            username: user.username,
            mobile: user.mobile,
        }).exec();
        console.log(res)
        return res;

    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}