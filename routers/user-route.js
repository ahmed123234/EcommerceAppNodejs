const userController = require('../controllers/user-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());


router.post('/register', userController.createUser);
router.get('/:categoryId', userController.getUSerById);
router.put('/:categoryId', userController.updateUserInfo);
router.delete('/:categoryId', userController.deleteUser);


router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;