const express = require('express');
const userController = require('../controllers/user-controller');

const route = express.Router();

route.use(express.json());

route.get('/', userController.render_users);
route.get('/getAll', userController.getAllUsers_get);
route.get('/profiles/getProfile', userController.render_user_profile);
route.get('/count', userController.getUsersCount);
route.get('/:userId', userController.getUSerById);
route.put('/:userId', userController.updateUserInfo);


module.exports = route;