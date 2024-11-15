const categoryController = require('../controllers/descriptiveImages-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());

router.delete('/', categoryController.deleteAllProductImages);

router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;