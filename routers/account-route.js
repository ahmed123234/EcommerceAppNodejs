const userController = require('../controllers/account-controller');
const { verify_JWT, checkUser } = require('../middlewares/auth')
const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', verify_JWT, checkUser, userController.displayUserProfile)
router.get('/signup', userController.signup_get)
router.post('/signup', userController.createUser);
router.get('/login', userController.login_get);
router.post('/login', userController.login_post);
router.get('/:userId', userController.getUSerById);
router.put('/:userId', userController.updateUserInfo);
router.delete('/:userId', userController.deleteUser);

// TODO: logout route


router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;